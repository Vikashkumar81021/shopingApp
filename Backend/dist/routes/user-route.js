import express from "express";
import { deleteUser, getAllUsers, getUser, userController } from "../controllers/user-Controller.js";
import { onlyAdmin } from "../middlewares/auth.js";
const router = express.Router();
router.post("/new", userController);
router.get("/all", onlyAdmin, getAllUsers);
router.get("/:id", getUser);
router.delete("/:id", onlyAdmin, deleteUser);
export default router;
