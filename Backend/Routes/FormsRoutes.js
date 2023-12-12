const express = require('express')
const router= express.Router()
const Form= require('../Models/FormsModel')

// to get all data
router.get('/',async (req,res)=>{
    try {
        const forms= await Form.find()
        res.send(forms)
    } catch (error) {
        res.send(error.message)
    }
})
//to get single form
router.get('/get/:id',async (req,res)=>{
    const params = req.params
    try {
        const forms= await Form.find({_id: params.id})
        res.send(forms)
    } catch (error) {
        res.send(error.message)
    }
})
//post new form
router.post('/',async (req,res)=>{
    const data= req.body
    if(!data){ res.status(404).send({message:"please pass body"}) }
    try {
        const form= await Form.create(data)
        // form.save()
        res.send({message:'form created successfully',data:form})
    } catch (error) {
        res.send(error.message)
    }
})

//delete form
router.delete('/:id',async (req,res)=>{
    const id= req.params.id
    
    try {
        if(!id){
            res.status(404).send({message:'id not specified'})    
        }
        const form= await Form.findByIdAndDelete(id)
        res.send({message:'form deleted successfully',data:form})
    } catch (error) {
        res.send(error.message)
    }
})

//edit form
router.patch('/:id',async (req,res)=>{
    const id= req.params.id
    const data= req.body
    try {
        if(!id){
            res.status(404).send({message:'id not specified'})    
        }

        const form = await Form.findByIdAndUpdate(id, { $set: data }, { new: true });
        res.send({message:'form updated successfully',data:form})
    } catch (error) {
        res.send(error.message)
    }
})



module.exports = router