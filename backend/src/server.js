import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import recipeRoutes from "./routes/recipeRoutes.js";

import dns from "node:dns/promises"
dns.setServers(["1.1.1.1", "8.8.8.8"]);


dotenv.config()
const app=express();
const port=process.env.PORT || 3001

// app.use(cors(
//     {
//          origin: 'https://bakershub-frontend.onrender.com'
//     }
// ))
app.use(express.json());
app.use("/recipes", recipeRoutes)

connectDB().then(()=>{
    app.listen(port, () =>{
        console.log(`http://localhost:${port}/recipes`)
    })
})


