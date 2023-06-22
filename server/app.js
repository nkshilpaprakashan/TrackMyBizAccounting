const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const adminRoutes = require('./routes/adminRouter')
const userRoutes = require('./routes/userRouter')
const myAdminRoutes = require('./routes/myAdminRouter')
const mongodb = require('./config/db')

mongodb() // invoked the imported function fron mongooseConnection.

const cors = require('cors') // setup for CORS
app.use(cors({
    origin: [process.env.FRONTEND],
    method: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ],
    credentials: true
}))

app.use(express.urlencoded({extended: true})) // to get data from post method
app.use(express.json()) // to recieve the data in json format from the axios call

app.use('/', userRoutes)  
// app.use('/', adminRoutes)
// app.use('/', myAdminRoutes)

app.listen(process.env.PORT || 8000, () => console.log('Server started at port'))
