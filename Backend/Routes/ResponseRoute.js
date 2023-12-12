const express = require('express')
const router= express.Router()
const Response= require('../Models/ResponseModel')

router.get('/:formId',async (req,res)=>{
    try {
        const response= await Response.find({"formId":req.params.formId})
        res.send({message:"response Fetched successfully",data:response})
    } catch (error) {
        res.send(error.message)
    }
})
router.post('/',async (req,res)=>{
    const data= req.body
    if(!data){ res.status(404).send({message:"please pass body"}) }
    try {
        const response= await Response.create(data)
        res.send({message:'form created successfully',data:response})
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router