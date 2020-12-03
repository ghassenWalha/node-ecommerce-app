const mongoose = require('mongoose');


// Creating a user Schema 
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:2,
        maxlength:25
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:25

    },
    email:{
        type:String,
        required:true,
    },
    bag:{
        type:Array(),

    },
    favorite:{
        type:Array(),
    }

})

// Creating a model from a Schema 

const User = mongoose.model('User',userSchema);

exports.User = User;