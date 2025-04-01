const express = require('express')
const connectDataBase = require('./config/connectDataBase')
const bodyParser = require('body-parser');
const app = express()
const product = require('./router/productRoute')
const cors = require('cors');
const user=require('./router/userRoute')
const cart=require('./router/cartRoute')

// Database Connectivity

connectDataBase()

// MiddleWares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json())
app.use(cors({
    origin: ['https://hotcart.netlify.app'], // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));

// Routes

app.use('/api',user)
app.use('/api',product)
app.use('/api',cart)


// Server Engine Start functionality

app.listen(3000,()=>{
    console.log("express start")
})