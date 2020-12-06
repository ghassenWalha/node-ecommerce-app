const router = require('express').Router();
const {User} = require('../modules/user');
const { route } = require('./products');
const bcrypt=require("bcrypt");
const auth = require("../middleware/auth"); 
const admin =require ("../middleware/admin")

router.post('/', async (req,res) => {
    const {name,email,bag,favorite,isAdmin} = req.body;
    try {
       const hashedPassword = await bcrypt.hash(req.body.password,10); 
       const user = new User({name,hashedPassword,email,bag,favorite,isAdmin});
        // Saving the user in the database
        const results = await user.save();
        token= user.generateToken() ;
        res.header("x-auth-token",token).send(results);

    }
     catch(ex) {
        res.send(ex);
    }
})

router.get('/',[auth,admin], async (req,res) => {
    try {
        // Find all Users in the database
        const results = await User.find({});
        res.send(results);
    } catch(ex) {
        res.send(ex);
    }
})

router.delete('/:id',async (req,res) => {
    const {id} = req.params;

    try {
        const results = await User.deleteOne({_id:id});
        res.send(results);
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;