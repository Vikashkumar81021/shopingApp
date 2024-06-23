import express from "express";
import { getAllUsers, userController } from "../controllers/user-Controller.js";
const router = express.Router();
router.post("/new", userController);
router.get("/all", getAllUsers);
export default router;
