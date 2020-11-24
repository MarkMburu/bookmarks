const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const middlewares = require("./middleware/middleware")
const morgan = require('morgan');
const helmet = require('helmet');

require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('common'));
app.use(helmet());

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
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;

app.listen(port ,()=>{
    console.log(`listening on port ${port}`)
})