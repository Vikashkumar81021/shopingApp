import { User } from "../models/user.model.js";
export const userController = async (req, res, next) => {
    try {
        const { name, email, photo, dob, gender, _id } = req.body;
        const user = await User.create({
            name,
            email,
            photo,
            dob: new Date(dob),
            gender,
            _id,
        });
        return res
            .status(201)
            .json({ sucess: true, message: "user created successfully" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ sucess: false, message: "user creation failed" });
    }
};
