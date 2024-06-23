import express from "express"
import userRoute from "./routes/user-route.js"
import { connectDB } from "./utils/db.js"
const app=express()
connectDB()
const port=3000

app.use(express.json())
//using routes
app.use("/api/v1/user",userRoute)

app.listen(port,()=>{
    console.log(`Server is working Port no is:${port}`);
    
})