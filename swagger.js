const swaggerJsdoc=require("swagger-jsdoc")

 

const options={

definition:{

openapi:"3.0.0",
info:{
title:"Node Express MongoDB REST API",
version:"1.0.0",
description:"This is a RESTful API built with Node.js, Express, and MongoDB"
},

servers:[
{
url:"http://localhost:3000"
}
]
},
apis: ["./routes/user.js"]
}
const swaggerdocs=swaggerJsdoc(options)

module.exports=swaggerdocs