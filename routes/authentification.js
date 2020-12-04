const router = require("express").Router();
const { User } = require("../modules/user") ; 
const jwt = require("jsonwebtoken") ; 
const bcrypt = require("bcrypt") ; 

router.post('/', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        console.log(user) ;
       
        if (!user)   res.status(404).send('invalid mail or password') ; 

        if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
            token= user.generateToken() ;
            res.send(token);

            //res.send(user);
        } else {
            res.status(400).send("invalid password");
        }
    
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})



module.exports = router;