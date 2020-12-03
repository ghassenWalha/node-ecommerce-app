const router = require('express').Router();
const {Product} = require('../modules/product');

router.get('/', async (req,res)=>{
    const {category} = req.params ;
    try{
        const results  = await Product.find();
        res.send(results); 
    }catch(ex){
        res.send(ex);
    }
}) 

router.post('/',async (req,res)=> {

   const {name,description,moreInfo,price,category,imgUrls,}= req.body ; 

      const product = new Product({name,description,moreInfo,price,category,imgUrls}) ;
      try{
            const results = await Product.save()  ; 
            res.send(results) ; 

      }catch(e) {res.send(e) ; }

})

module.exports = router ; 

