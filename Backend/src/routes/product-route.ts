import express from "express";
import { adminProduct, categories, latestProductController, productController, singleProduct, updateProduct } from "../controllers/product-Controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router=express.Router()

router.post("/new",singleUpload, productController)
router.get("/latest",latestProductController)
router.get("/categories",categories)
router.get("/adminProduct",adminProduct)
router.route('/:id').get(singleProduct).put(updateProduct)

export default router