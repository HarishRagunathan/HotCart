const express = require('express')
const { AddtoCart, ViewCart, DeleteCart } = require('../controller/cart')
const route = express.Router()

route.post('/addtocart',AddtoCart)
route.get('/viewcart/:id',ViewCart)
route.post('/deletecart',DeleteCart)
module.exports=route