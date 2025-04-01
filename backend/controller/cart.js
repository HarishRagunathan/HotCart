const CartModel = require("../model/cartModel");
const ProductModel = require("../model/productModel");
const UserModel = require("../model/userModel");

exports.AddtoCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {

        
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        const exist = await CartModel.findOne({userId,productId})
        if (exist) {
            return res.status(201).json({
                message: "Product Already in cart",
            });
        }

        const cartItem = await CartModel.create({
            userId,
            productId,
        });

        res.status(200).json({
            message: "Product added to cart",
            product,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "An error occurred while adding the product to the cart",
            error: error.message, 
        });
    }
};


exports.ViewCart = async(req,res)=>{
    const userID = req.params.id;
    try {
        const cartItems = await CartModel.find({userId:userID})
        if(cartItems.length==0){
            return res.status(201).json({
                message:"Cart is empty"
            })
        }
        res.status(201).json({
            message:"cart Products",
            cartItems
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}



exports.DeleteCart = async(req,res)=>{
    const {userId,productId}=req.body
    try {
        const DeleteCart = await CartModel.findOneAndDelete({userId,productId})
        if(!DeleteCart){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json({
            message:"Product deleted sucessfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}