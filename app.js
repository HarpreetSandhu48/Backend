const express=require("express")
const mongoose=require("mongoose")
const userouter=require("./routes/user")
const swaggerUi=require('swagger-ui-express')
const swaggerdocs=require("./swagger")
// const cors=require("cors")
const app=express()
app.use(express.json())
const PORT=3000

mongoose.connect("mongodb://127.0.0.1:27017/node")
    .then(()=>{
        console.log("connected")
    })
    .catch(()=>{
        console.log("not conncetd")
    })
    app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerdocs))
    // app.use(cors({origin:"http://localhost:5173"}))
app.use("/api",userouter)
app.listen(PORT,()=>{
    console.log("your Port is wertyui dvfr  dcds",PORT)
})