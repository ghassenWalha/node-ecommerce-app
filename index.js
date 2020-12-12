const express = require('express');
const mongoose = require('mongoose');
const categories = require('./routes/categories');
const products = require('./routes/products') ;
const users = require('./routes/users'); 
const auth = require('./routes/authentification') ; 
const bag = require('./routes/bag'); 
const app = express();

// middleware to parse json to javascript objects
app.use(express.json());

// connecting to mongodb
mongoose.connect('mongodb+srv://gha2sen:@cluster0.o7rlv.mongodb.net/flutter_ecommerce_project',{ useNewUrlParser: true , useUnifiedTopology: true})
.then(()=>console.log("connected to mongodb successfully"))
.catch((err)=> console.log('couldnt connect to mongodb'+ err));

//delegating a router to a given url
// all request to /api/categories will be handled by the categories router
app.use("/api/categories",categories);
app.use("/api/products",products) ; 
app.use("/api/users",users);
app.use("/api/auth",auth) ; 
app.use("/api/bag",bag);

//choose the backend port 
const port = 3002;

//starting the backend server
app.listen(port,()=>console.log("listening on port:"+ port ));




