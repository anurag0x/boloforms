const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const FormRoutes= require("./Routes/FormsRoutes")
const ResponseRoute= require("./Routes/ResponseRoute")

app.use(cors())
app.use(express.json())

app.use('/form',FormRoutes)
app.use('/response',ResponseRoute)

app.use('/',(req,res)=>{
    res.send('Welcome to bolo forms api')
})

app.listen('8080',async ()=>{
    console.log('server started');
    try {
        mongoose.connect("mongodb+srv://anurag:<password>@cluster0.mwf7h6h.mongodb.net/boloforms")
        console.log('database connection established')
    } catch (error) {
        console.log('error while connecting database ',error);
    }
})
