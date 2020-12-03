const router = require('express').Router();
const {User} = require('../modules/user');
const {Product} = require('../modules/product');



router.get('/:bag',async (req,res)=>{
    const {bag} = req.params ;
    try{
        var resultArray=await Product.find({_id:{$in:bag}});
         res.send(resultArray);
    }
    catch(ex){
        res.send(ex);
    }
    }
    )
router.post('/',async (req,res)=>{
     const {id,bag} = req.body;
         try{
            var resultArray=await User.update({
                email
            }, { $push: { bag: id } });
            res.send(resultArray);
         }
         catch(ex){
             res.send(ex);
         }
         });
router.put('/:id/:bag',async (req,res)=>{
            const {id,bag} = req.params;
            try{
                User.update({
                    email
                }, { $pull: { bag: id } });
                }
             
             catch(ex){
                 res.send(ex);
             }
             })


  