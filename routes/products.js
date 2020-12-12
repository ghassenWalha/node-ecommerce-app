const router = require('express').Router();
const { Product } = require('../modules/product');
const mongoose = require('mongoose');
const auth = require('../middleware/auth') ; 
const admin = require('../middleware/admin') ; 


// finding the liste ofproducts by categorie 
router.get('/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const results = await Product.find({ "category": category });
        res.send(results);
    } catch (ex) { res.send(ex); }
})
router.get('/', async (req, res) => {
 
    try {
        console.log("hello");
        const results = await Product.find({  });
        res.send(results);
    } catch (ex) { res.send(ex); }
})

//  finding a single product by id 
router.get('/findone/:id', async (req, res) => {

    const { id } = req.params;
    try {
        const results = await Product.find({ "_id": id });

        console.log(results);

        res.send(results);

    } catch (ex) { res.send(ex); }
})

// creating a new product
router.post('/',/*[auth,admin] ,*/async (req, res) => {
    const { name, description, moreInfo, price, category, imgUrls, } = req.body;
    const product = new Product({ name, description, moreInfo, price, category, imgUrls });
    try {
        const results = await product.save();
        res.send(results);
    }
    catch (e) { res.send(e); }

})
// deleting a product by an id 
router.delete('/:id',/*[auth,admin],*/ async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id).exec();
    res.send("success") ;
})

//  updating a product 
router.put('/',/*[auth,admin] ,*/ async (req, res) => {
    const { name, description, moreInfo, price, category, imgUrls } = req.body ;
      const id =req.body._id ; 
    try {
         const filter={"_id":req.body._id}  ; 
         const update={ name: req.body.name, description: req.body.description, moreInfo: req.body.moreInfo, price: req.body.price, category: req.body.category, imgUrls: req.body.imgUrls} ; 
         let p = await Product.findByIdAndUpdate(filter,update,{returnOriginal:false})
           res.send(p) ; 

    } catch (ex) { res.send(ex); }
})
module.exports = router;