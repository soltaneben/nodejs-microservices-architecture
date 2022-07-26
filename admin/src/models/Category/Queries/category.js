const express = require("express");
const route = express.Router();
const cors = require("cors");
const Category = require("../Category");
route.use(cors());
route.use(express.json());


module.exports = {
    getCategoriesList: () => new Promise(async(resolve, reject) => {
        try {
            let categories = await Category.find();
            resolve(categories);
        }
        catch(err){
            reject(err)
        }
    }),
    createCategory: (myData) => new Promise(async(resolve, reject) => {
        try {
            const categData = await new Category(myData).save();
            resolve(categData);
        }
        catch(err){
            reject(err)
        }
    }),
}