export const errorMidleware = (error, req, res, next) => {
    error.message || (error.message = "Internal Server error"), error.statusCode || (error.statusCode = 500);
    return res.status(error.statusCode).json({
        sucess: false,
        message: "some error"
    });
};
