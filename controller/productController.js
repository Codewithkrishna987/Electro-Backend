import { Product } from "../models/productModel";

export const createProduct = async (res, req) =>{
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const getAllProducts = async(req, res) =>{
    try {
        const products = await Product.find();
        res.json(products)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getProductById = async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message: "Product not found"});
        res.json(product);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const updateProduct = async (req, res) =>{
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            res.body,
            { new: true }
        );
        if(!product) return res.status(404),json({message: "Product not found"});
        res.json(product);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteProduct = async (req, res) =>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).json({message:"Product not found"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}