

const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cookieParser = require('cookie-parser')


// const userCollection=require('./models/userSchema')
const adminRoutes=require('./routes/adminRouter')
const userRoutes=require('./routes/userRouter')
const myAdminRoutes=require('./routes/myAdminRouter')

const mongodb=require('./config/db')
mongodb()//involked the imported function fron mongooseConnection.





const cors=require('cors')//setup for CORS
app.use(
    cors({
        origin:["http://localhost:3000"],
        method:["GET","POST"],
        credentials:true,
    })
)

const path=require('path')






app.use(express.urlencoded({extended:true}))//to get data from post method
app.use(express.json())//to recieve the data in json format from the axios call



app.use('/',userRoutes)
app.use('/',adminRoutes)

app.use('/',myAdminRoutes)

app.listen(8000,()=>console.log('Server started at port 8000'))