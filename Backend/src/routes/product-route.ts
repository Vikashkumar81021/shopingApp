import express from "express";
import { productController } from "../controllers/product-Controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router=express.Router()

router.post("/new",singleUpload, productController)

export default router