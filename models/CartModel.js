import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, ref: "userModel1", required: true
    },
    items:[
       {
         productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity:{
            type:String,
            default:1
        }
       }
    ]
}, {timestamps: true})

export const Cart = mongoose.model("Cart", cartSchema);
