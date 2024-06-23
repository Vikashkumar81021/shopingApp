import express from "express";
import  {userController}  from "../controllers/user-Controller.js";
const router = express.Router();

router.post("/new",userController)
export default router;
