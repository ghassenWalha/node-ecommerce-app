const router = require("express").Router();
const {User} = require("../modules/user");
const {Product} = require("../modules/product");

router.get("/", async (req, res) => {
    const email = "ghassen@yahoo.fr";
    /*const {bag} = req.params ;*/
    try {
        var user = await User.findOne({email: email});

        var resultArray = await Product.find({_id: {$in: user.bag}});
        console.log(resultArray);

        res.send(resultArray);
    } catch (ex) {
        res.send(ex);
    }
});

router.post("/", async (req, res) => {
    const email = "ghassen@yahoo.fr";
    const {id} = req.body;

    try {
        var result = await User.update(
            {
                email
            },
            {$push: {bag: id}}
        );
        console.log(result);
        res.send(result);
    } catch (ex) {
        res.send(ex);
    }
});


router.delete("/:id", async (req, res) => {
    const email = "ghassen@yahoo.fr";

    try {
        const {id} = req.params;

        const results = await User.update(
            {
                email
            },
            {$pull: {bag: id}}
        );
        let user = await User.findOne({
            email,
        });
        res.send(user);
    } catch (ex) {
        res.send(ex);
    }
});

module.exports = router;

