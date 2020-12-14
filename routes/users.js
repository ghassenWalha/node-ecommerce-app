const router = require('express').Router();
const {User} = require('../modules/user');
const {route} = require('./products');
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin")

router.post('/', async (req, res) => {
    console.log("hell");
    const {name, email, bag, favorite, isAdmin} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({name, hashedPassword, email, bag, favorite, isAdmin});
        // Saving the user in the database
        const results = await user.save();
        token = user.generateToken();
        res.header("x-auth-token", token).send(results);
    } catch (ex) {
        res.send(ex);
    }
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


module.exports = router;