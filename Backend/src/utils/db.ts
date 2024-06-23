import mongoose from "mongoose"

export const connectDB=()=>{
    mongoose.connect("mongodb://localhost:27017",{
        dbName:"Ecommerce_API_node_and_typeScript"
    }).then((c)=>console.log(`db connection is ${c.connection.host}`)).catch((e)=>console.log("database connection failed",e));
    
}