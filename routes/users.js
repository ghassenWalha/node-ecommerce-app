const router = require('express').Router();
const {User} = require('../modules/user');


router.post('/', async (req,res) => {
    const {name,password,email,bag,favorite} = req.body;

    const user = new User({name,password,email,bag,favorite});
    try {
        // Saving the user in the database
        const results = await user.save();
        res.send(results);
    } catch(ex) {
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