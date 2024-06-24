import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import { NewUserRequestbody } from "../types/types.js";
export const userController = async (
  req: Request<{}, {}, NewUserRequestbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, photo, dob, gender, _id } = req.body;
    let user = await User.findById(_id);
    if (user) {
      return res.status(200).json({
        sucess: true,
        message: `welcome ${user.name}`,
      });
    }
    if (!name || !email || !photo || !dob || !gender || !_id) {
      return res.status(401).json({
        success: false,
        message: "Please Enter all fields",
      });
    }
    user = await User.create({
      name,
      email,
      photo,
      dob: new Date(dob),
      gender,
      _id,
    });

    return res
      .status(201)
      .json({ sucess: true, message: "user created successfully", user });
  } catch (error) {
    res.status(501).json({
      sucess: false,
      mesage: "Internal server error",
      error,
    });
  }
};

export const getAllUsers = async (
  req: Request<{}, {}, NewUserRequestbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.find({});

    return res.status(200).json({
      sucess: true,
      message: "get all users",
      user,
    });
  } catch (error) {
    return res.status(501).json({
      sucess: false,
      message: "user not found",
    });
  }
};

export const getUser = async (
  req: Request<{}, {}, NewUserRequestbody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid id & user Not found",
      });
    }
    return res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {}
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "User deleted successfully",
        user,
      });
    }
    await user.deleteOne();
  } catch (error) {
    return res.status(501).json({
      sucess: false,
      message: "User delete failed",
    });
  }
};
