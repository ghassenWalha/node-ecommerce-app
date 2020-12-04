const router = require('express').Router();
const {User} = require('../modules/user');
const { route } = require('./products');
const bcrypt=require("bcrypt");

router.post('/', async (req,res) => {
    const {name,email,bag,favorite} = req.body;
    try {
       const hashedPassword = await bcrypt.hash(req.body.password,10); 
       const user = new User({name,hashedPassword,email,bag,favorite});
        // Saving the user in the database
        const results = await user.save();
        token= user.generateToken() ;
        res.header("x-auth-token",token).send(results);

    }
     catch(ex) {
        res.send(ex);
    }
})

router.get('/', async (req,res) => {
    try {
        // Find all Users in the database
        const results = await User.find({});
        res.send(results);
    } catch(ex) {
        res.send(ex);
    }
})


module.exports = router;