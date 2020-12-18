const router = require('express').Router();
const {User} = require('../modules/user');
const {route} = require('./products');
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin")
const joiSchema = require("./schemas/joi_schema") ;

router.post('/', async (req, res) => {
    const {name, email, bag, favorite} = req.body;
    try { //verifying if the username,password and email are valide
        const{error}=joiSchema.SignupSchema.validate({username:name,password:req.body.password,email:email});  
        if(error){
            res.send({error:error["message"]}) ; 
        }else{  //verifyinig if the email is already used 
            const oldUser = await User.find({email:email});
          
            if(oldUser.length!=0){
              res.send({error:"adresse already exist"}) ; 
            
        }else{

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        var domain = email.substring(email.lastIndexOf("@") );
        console.log(domain);

        const isAdmin=(domain==="@jei-formation-2020.com") ;
        const user = new User({name, hashedPassword, email, bag, favorite, isAdmin});
        // Saving the user in the database
        const results = await user.save();
        token = user.generateToken();
        res.header("x-auth-token", token).send(results);}
    }
    } catch (ex) {  
        res.send(ex); }
})

router.get('/', async (req, res) => {
    try {
        // Find all Users in the database
        const results = await User.find({});
        res.send(results);
    } catch (ex) {
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