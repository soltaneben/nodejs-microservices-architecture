const express = require("express");
const route = express.Router();
const cors = require("cors");
const Category = require("../../Category/Category");
const Product = require("../Product");
route.use(cors());
route.use(express.json());


module.exports = {
    getProducts: () => new Promise(async(resolve, reject) => {
        try {
            let products = await Product.find();
            resolve(products);
        }
        catch(err){
            reject(err)
        }
    }),
    createProduct: (data) => new Promise(async(resolve, reject) => {
        try{
            const newProduct = new Product(data);
            let product = await newProduct.save();
            resolve(product);
        }
        catch(err){
            reject(err)
        }
    }),
}