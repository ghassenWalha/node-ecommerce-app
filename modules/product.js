const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    moreInfo: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    price: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    }
    ,
    category: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    },
    imgUrls: {
        type: String,
        required: true,
    }

})

const Product= mongoose.model('Product',productSchema) ;

exports.Product=Product ; 