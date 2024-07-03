import { NextFunction, Request, Response } from "express";
import {
  NewProductRequestbody,
  baseQuery,
  searchRequestQuery,
} from "../types/types.js";
import { Product } from "../models/products.model.js";
import { rm } from "fs";
import { nodeCache } from "../app.js";
export const productController = async (
  req: Request<any, {}, NewProductRequestbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, category, stock } = req.body;
    const photo = req.file;
    if (!photo) {
      return res.status(400).json({
        sucess: false,
        message: "Please Add Photo",
      });
    }
    if (
      [name, price, category, stock].some((field) =>
        typeof field === "string" ? field.trim() === "" : !field
      )
    ) {
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
  } catch (error) {
    return res.status(501).json({
      sucess: false,
      message: "Product creation failed",
    });
  }
};

export const latestProductController = async (
  req: Request<{}, {}, NewProductRequestbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    let product;
    if(nodeCache.has("latest-product"))product=JSON.parse(nodeCache.get("latest-product")as  string)
      else{
        product = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        nodeCache.set("latest-product",JSON.stringify(product))
    }

    return res.status(201).json({
      message: "latest product",
      sucess: true,
      product,
    });
  } catch (error) {
    return res.status(501).json({
      sucess: false,
      message: "Product creation failed",
    });
  }
};

export const categories = async (
  req: Request<{}, {}, NewProductRequestbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Product.distinct("category");
    return res.status(200).json({
      sucess: true,
      message: "Get All Categories",
      categories,
    });
  } catch (error) {
    return res.status(501).json({
      sucess: false,
      message: "Product creation failed",
    });
  }
};

export const adminProduct = async (
  req: Request<{}, {}, NewProductRequestbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.find({});
    return res.status(200).json({
      sucess: true,
      message: "Get Admin Categories",
      product,
    });
  } catch (error) {
    return res.status(501).json({
      sucess: false,
      message: "get admin product failed",
    });
  }
};

export const singleProduct = async (
  req: Request<{ id: string }, {}, NewProductRequestbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        sucess: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      sucess: true,
      message: "Get single product",
      product,
    });
  } catch (error) {
    return res.status(501).json({
      sucess: false,
      message: "Product creation failed",
    });
  }
};

export const updateProduct = async (
  req: Request<{ id: string }, {}, NewProductRequestbody>,
  res: Response,
  next: NextFunction
) => {
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
      rm(updateProduct.photo!, () => {
        console.log("Old photo deleted");
      });
      updateProduct.photo = photo.path;
    }
    const updates: Partial<NewProductRequestbody> = {};

    if (name !== undefined) updates.name = name;
    if (price !== undefined) updates.price = price;
    if (category !== undefined) updates.category = category;
    if (stock !== undefined) updates.stock = stock;

    await updateProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updateProduct,
    });
  } catch (error) {
    console.error("Error updating product");
    return res.status(500).json({
      success: false,
      message: "Product update failed",
    });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }, {}, NewProductRequestbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        sucess: false,
        message: "Product not found",
      });
    }
    rm(updateProduct.photo!, () => {
      console.log("Product photo delete");
    });
    await product.deleteOne();
    return res.status(200).json({
      sucess: true,
      message: "Product delete Sucessfully",
      product,
    });
  } catch (error) {
    return res.status(501).json({
      sucess: false,
      message: "Product creation failed",
    });
  }
};

export const searchProduct = async (
  req: Request<{}, {}, searchRequestQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sort, search, price, category } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;
    const baseQuery: baseQuery = {
      name: {
        $regex: "",
        $options: ""
      },
      price: {
        $lte: 0
      },
      category: ""
    };
    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "1",
      };
    if (price)
      baseQuery.price = {
        $lte: Number(price),
      };
      if(category)baseQuery.category=category
    const product = await Product.find( baseQuery ).sort(sort?{price:sort==="asc" ?1:-1}).limit(limit).skip(skip)
    const filteProduct=await Product.find({baseQuery})
    return res.status(201).json({
      message: "latest product",
      sucess: true, 
      product,
      filteProduct
    });
  } catch (error) {
    return res.status(501).json({
      sucess: false,
      message: "Product creation failed",
    });
  }
};
