const mongoose = require('mongoose')

const responseSchema= mongoose.Schema({
    "formId":{type:mongoose.Schema.Types.ObjectId},
    "user":{type:String, required:true},
    "marks":{type:Number,required:true},
})

module.exports = mongoose.model('response',responseSchema)