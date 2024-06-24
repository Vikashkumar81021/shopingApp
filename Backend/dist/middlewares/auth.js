import { User } from "../models/user.model.js";
export const onlyAdmin = async (req, res, next) => {
    try {
        const id = req.query;
        if (!id) {
            return res.status(401).json({
                sucess: false,
                message: "Not authorized !! Please logIn",
            });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                sucess: false,
                message: "User not found.",
            });
        }
        if (user.role !== "admin") {
            return res.status(403).json({
                sucess: false,
                message: "Forbidden: You do not have the required permissions.",
            });
        }
        next();
    }
    catch (error) {
        res.status(501).json({
            sucess: false,
            message: "Internal Server Error.",
        });
    }
};
