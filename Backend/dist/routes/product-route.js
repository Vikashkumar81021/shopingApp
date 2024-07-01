import express from "express";
import { adminProduct, categories, deleteProduct, latestProductController, productController, searchProduct, singleProduct, updateProduct, } from "../controllers/product-Controller.js";
import { singleUpload } from "../middlewares/multer.js";
import { onlyAdmin } from "../middlewares/auth.js";
const router = express.Router();
router.post("/new", singleUpload, productController);
router.get("/latest", latestProductController);
router.get("/categories", categories);
router.get("/adminProduct", adminProduct);
router
    .route("/:id")
    .get(singleProduct)
    .put(onlyAdmin, updateProduct)
    .delete(onlyAdmin, deleteProduct);
router.get("/search", searchProduct);
export default router;
