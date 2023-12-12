const mongoose = require('mongoose')

const formSchema= mongoose.Schema({
    "title":{type:"string", isRequired: true},
    "image":{type:"string"},
    "questions":{type:{}}
})

module.exports = mongoose.model('form',formSchema)