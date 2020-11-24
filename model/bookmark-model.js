const mongoose = require('mongoose')

const {Schema} = mongoose;
const bookmarkSchema = new Schema({
    userid:{type: String},
    author:{type: String},
    content:{type: String},
    description:{type:String},
    publishedAt:{type: Date},
    title: {type: String},
    url: {type: String},
    urlToImage: {type: String},
    source: { 
    name: {type: String}
}
})

const bookmark = mongoose.model('bookmark',bookmarkSchema)

module.exports = bookmark