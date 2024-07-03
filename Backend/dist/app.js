import express from "express";
import userRoute from "./routes/user-route.js";
import productRoute from "./routes/product-route.js";
import { connectDB } from "./utils/db.js";
import { errorMidleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
const app = express();
connectDB();
export const nodeCache = new NodeCache({});
const port = 3000;
app.use("/uploads", express.static("uploads"));
app.use(express.json());
//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use(errorMidleware);
app.listen(port, () => {
    console.log(`Server is working Port no is:${port}`);
});
