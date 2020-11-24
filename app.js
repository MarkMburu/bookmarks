const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

const uri = process.env.MONGO_URI

mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true})

const db = mongoose.connection

db.once('open',()=>{
    console.log("mongodb conncetion established successfully")
})
db.on('error',(err)=>{
    console.log(err)
})

const bookmarkRouter = require('./routes/bookmarks-route.js');
app.use('/bookmarks',bookmarkRouter);
const port = process.env.PORT || 5000;

app.listen(port ,()=>{
    console.log(`listening on port ${port}`)
})