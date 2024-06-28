import { Product } from "../models/products.model.js";
export const productController = async (req, res, next) => {
    try {
        const { name, price, category, stock } = req.body;
        const photo = req.file;
        const product = await Product.create({
            name,
            price,
            category,
            stock,
            photo: photo?.path
        });
        return res.status(201).json({
            sucess: true,
            message: "Product create successfully"
        });
    }
    catch (error) {
        return res.status(501).json({
            sucess: false,
            message: "Product creation failed"
        });
    }
};
