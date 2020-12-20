const router = require('express').Router();
const { cloudinary } = require('../utils/cloudinary');


router.post('/', async (req, res) => {
    try {
        const fileStr = req.body.data;
        console.log(req.body)
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        res.send( uploadResponse.secure_url);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});


module.exports = router;
