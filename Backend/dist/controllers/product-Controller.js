import { Product } from "../models/products.model.js";
import { rm } from "fs";
export const productController = async (req, res, next) => {
    try {
        const { name, price, category, stock } = req.body;
        const photo = req.file;
        if (!photo) {
            return res.status(400).json({
                sucess: false,
                message: "Please Add Photo",
            });
        }
        if ([name, price, category, stock].some((field) => typeof field === "string" ? field.trim() === "" : !field)) {
            rm(photo.path, () => {
                console.log("photo deleted");
            });
            return res.status(400).json({
                error: "All fields must be filled.",
            });
        }
        const product = await Product.create({
            name,
            price,
            category,
            stock,
            photo: photo?.path,
        });
        return res.status(201).json({
            sucess: true,
            message: "Product create successfully",
            product,
        });
    }
    catch (error) {
        return res.status(501).json({
            sucess: false,
            message: "Product creation failed",
        });
    }
};
export const latestProductController = async (req, res, next) => {
    try {
        const product = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        return res.status(201).json({
            message: "latest product",
            sucess: true,
            product,
        });
    }
    catch (error) {
        return res.status(501).json({
            sucess: false,
            message: "Product creation failed",
        });
    }
};
export const categories = async (req, res, next) => {
    try {
        const categories = await Product.distinct("category");
        return res.status(200).json({
            sucess: true,
            message: "Get All Categories",
            categories,
        });
    }
    catch (error) {
        return res.status(501).json({
            sucess: false,
            message: "Product creation failed",
        });
    }
};
export const adminProduct = async (req, res, next) => {
    try {
        const product = await Product.find({});
        return res.status(200).json({
            sucess: true,
            message: "Get Admin Categories",
            product,
        });
    }
    catch (error) {
        return res.status(501).json({
            sucess: false,
            message: "get admin product failed",
        });
    }
};
export const singleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json({
            sucess: true,
            message: "Get single product",
            product,
        });
    }
    catch (error) {
        return res.status(501).json({
            sucess: false,
            message: "Product creation failed",
        });
    }
};
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, category, stock } = req.body;
        const photo = req.file;
        const updateProduct = await Product.findById(id);
        if (!updateProduct) {
            return res.status(404).json({
                success: false,
                message: "Invalid Product ID",
            });
        }
        if (photo) {
            rm(updateProduct.photo, () => {
                console.log("Old photo deleted");
            });
            updateProduct.photo = photo.path;
        }
        const updates = {};
        if (name !== undefined)
            updates.name = name;
        if (price !== undefined)
            updates.price = price;
        if (category !== undefined)
            updates.category = category;
        if (stock !== undefined)
            updates.stock = stock;
        await updateProduct.save();
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updateProduct,
        });
    }
    catch (error) {
        console.error('Error updating product');
        return res.status(500).json({
            success: false,
            message: "Product update failed",
        });
    }
};
