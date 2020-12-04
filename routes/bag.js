const router = require('express').Router();
const { User } = require('../modules/user');
const { Product } = require('../modules/product');



router.get('/', async (req, res) => {
    const email = "amal@gmail.com";
    /*const {bag} = req.params ;*/
    try {
        console.log("hello");
        var user = await User.find({ "email": email });
        var bag = user.bag;

        var resultArray = await Product.findOne({ _id: { $in: bag } });
        res.send(resultArray);

    }

    catch (ex) {
        res.send(ex);
    }
}
)
router.post('/', async (req, res) => {
    const email = "amal@gmail.com";
    const { id, bag } = req.body;
    /*const {bag} = req.params ;*/
    try {
        console.log("hello1");
        var user = await User.find({ "email": email });

      
            var result = await user.update({
                email
            }, { $push: { bag: id } });
            res.send(result);
        

        
    }
    catch (ex) {
        res.send(ex);
    }
});
router.put('/:id', async (req, res) => {
    const email = "amal@gmail.com";
    try {
        var user = await User.find({ "email": email });
        const { id } = req.params;
        try {
            user.update({
                email
            }, { $pull: { bag: id } });
        }

        catch (ex) {
            res.send(ex);
        }
    }
    catch (ex) {
        res.send(ex);
    }
})

module.exports = router;
