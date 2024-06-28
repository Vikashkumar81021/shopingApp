import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name"],
    },
    photo: {
        type: String,
        required: [true, "Please Upload Photo"]
    },
    price: {
        type: Number,
        required: [true, "Pleade enter price"]
    },
    stock: {
        type: Number,
        required: [true, "Please Enter stock"]
    },
    category: {
        type: String,
        required: [true, "Please enter product category"],
        trim: true
    }
}, { timestamps: true });
export const Product = mongoose.model("Products", productSchema);
