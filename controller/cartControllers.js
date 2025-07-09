import { Cart } from "../models/CartModel";

// add to cart

export const addToCart = async (req, res) =>{
    const {productId, quantity} = req.body;
    const userId = req.user._id

    let cart = await Cart.findOne({userId});
    if(!cart) {
        cart = await Cart.create({userId, items:[{productId, quantity}]})
    } else{
        const itemIndex = cart.items.findIndex(item => item.productId == productId);
        if(itemIndex > -1){
            cart.items[itemIndex].quantity += quantity || 1
        } else {
            cart.items.push({productId, quantity: quantity || 1});
        }
        await cart.save();
    }
    res.status(200).json(cart);
};

//get user cart

export const getCart = async (req, res) =>{
    const cart = await Cart.findOne({userId: req.user._id}).populate("item.productId");
    res.status(200).json(cart);
}

// remove from cart

export const removeFromCart = async (req, res) =>{
    const {productId} = req.params;
    const cart = await Cart.findOne({userId:req.user._id});

    if(!cart) return res.status(404).json({message: "cart not found"});

    cart.items = cart.items.filter(item => item.productId != productId);
    await save();

    res.status(200).json({message:"Item Removed", cart});
    
}