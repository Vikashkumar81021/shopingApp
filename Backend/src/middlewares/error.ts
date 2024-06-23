import {NextFunction,Request,Response} from "express"
import ErrorHandler from "../utils/errorHandler.js"

export const errorMidleware=(
    error:ErrorHandler,
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    error.message ||="Internal Server error",
    error.statusCode||=500
return res.status(error.statusCode).json({

   
    sucess:false,
    message:"some error"
})
}