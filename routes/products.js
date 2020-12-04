const router = require('express').Router();
const { Product } = require('../modules/product');
const mongoose = require('mongoose');


router.get('/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const results = await Product.find({ "category": category });
        console.log(results);
        res.send(results);
    } catch (ex) { res.send(ex); }
})


router.get('/findone/:id', async (req, res) => {

    const { id } = req.params;
    try {
        const results = await Product.find({ "_id": id });

        console.log(results);

        res.send(results);

    } catch (ex) { res.send(ex); }
})


router.post('/', async (req, res) => {
    const { name, description, moreInfo, price, category, imgUrls, } = req.body;
    const product = new Product({ name, description, moreInfo, price, category, imgUrls });
    try {
        const results = await product.save();
        res.send(results);
    }
    catch (e) { res.send(e); }

})

router.delete('/:id', async (req, res) => {

    const product = await Product.findByIdAndDelete(req.params.id).exec();
    res.redirect('/');
})




router.put('/', async (req, res) => {
    const { name, description, moreInfo, price, category, imgUrls } = req.body ;
      const id =req.body._id ; 
    try {
         const filter={"_id":req.body._id}  ; 
         const update={ name: req.body.name, description: req.body.description, moreInfo: req.body.moreInfo, price: req.body.price, category: req.body.category, imgUrls: req.body.imgUrls} ; 
         let p = await Product.findByIdAndUpdate(filter,update,{returnOriginal:false})
         
           res.send(p) ; 
           res.send()

    } catch (ex) { res.send(ex); }
})



module.exports = router;