const ProductModel = require("../model/productModel");


exports.ProductUpload = async (req, res) => {
    try {
       const {
            productName,
            productCategory,
            productDescription,
            productReview,
            productNewPrice,
            productOldPrice,
            productHotStatus
        } = req.body;

        const productColor = req.body.productColor ? req.body.productColor.split(",") : [];
        const productSize = req.body.productSize ? req.body.productSize.split(",") : [];

       const productImage = req.file ? `/uploads/${req.file.filename}` : null;

       const product = await ProductModel.create({
            productName,
            productImage,
            productCategory,
            productDescription,
            productReview,
            productColor,
            productSize,
            productNewPrice,
            productOldPrice,
            productHotStatus: Boolean(productHotStatus)
        });

        res.status(201).json({
            message: "Product Uploaded Successfully",
            product
        });

    } catch (error) {
        console.error("Error:", error.message); 
        res.status(500).json({
            message: "Error uploading product",
            error: error.message
        });
    }
};



exports.ProductView = async(req,res,next)=>{
    const products = await ProductModel.find({})
    res.json({
        message:"Product View",
        products
    })
}


exports.SingleProduct=async(req,res)=>{
    const id = req.params.id
    try {
        const product = await ProductModel.find({_id:id})
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json({
            product
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

exports.DeleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deleteProduct = await ProductModel.findByIdAndDelete(productId);
        
        if (!deleteProduct) { 
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({ 
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ 
            message: error.message
        });
    }
};
