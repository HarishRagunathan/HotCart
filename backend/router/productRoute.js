const express=require('express')
const { ProductView, ProductUpload, SingleProduct, DeleteProduct } = require('../controller/product')
const upload = require('./../middleware/multerConfig')
const route = express.Router()

route.post('/addproduct',upload.single('productImage'),ProductUpload)
route.get('/productshow',ProductView)
route.get('/singleproduct/:id',SingleProduct)
route.delete('/deleteproduct/:id',DeleteProduct)

module.exports=route