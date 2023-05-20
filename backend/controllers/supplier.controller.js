const Supplier=require('../classes/Supplier.class');
const supplierModel=require('../models/supplier.model');
const Joi = require('joi');

const validate = (data, option) => {
    const presence = option ? 'required' : 'optional'
    return Joi.object({
        name: Joi.string().max(200).presence(presence),
        owner: Joi.number().integer().presence(presence),
    }).validate(data, { abortEarly: false }).error;
}

const getAll=async(req,res)=>{
    //get all suppliers
    const result=await supplierModel.findAll();
    if (result && result !== -1) {
        return res.json(result)
    }
    else if (result === -1) {
        return res.sendStatus(404)
    }
    return res.sendStatus(500);
}

const getOne=async(req,res)=>{
    //get one supplier by Id
    const id=req.params.id;
    if(isNaN(id))
        return res.sendStatus(422);
    const supplierId=parseInt(id);
    const result=await supplierModel.findOne(supplierId);
    if (result && result !== -1) {
        return res.json(result)
    }
    else if (result === -1) {
        return res.sendStatus(404)
    }
    return res.sendStatus(500);
}

const getUser=async(req,res)=>{
    //Check si un ou plusieurs
    const id=req.params.id;
    if(isNaN(id))
        return res.sendStatus(422);
    const {supplier}=req.query;
    let result=null;
    const userId=parseInt(id)
    if(supplier &&!isNaN(supplier)){
        const supplierId=parseInt(supplier);
        result=await supplierModel.findOneUser(userId,supplierId)
    }
    else{
        result=await supplierModel.findAllUser(userId);
    }
    if (result && result !== -1) {
        return res.json(result)
    }
    else if (result === -1) {
        return res.sendStatus(404)
    }
    return res.sendStatus(500);
}


const addOne=async(req,res)=>{
    const {name,owner}=req.body;
    const errors=validate({name,owner},true);
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
    }
    const newSupplier=new Supplier(null,name,owner);
    const result=await supplierModel.addOne(newSupplier);
    if(result){
        return res.status(201).json(result);
    }
    else
        res.sendStatus(500);
}

const updateOne=async(req,res)=>{
    const id=req.params.id;
    if(isNaN(id))
        return res.sendStatus(422);
    const idSupplier=parseInt(id);
    const {name,owner}=req.body;
    const errors=validate({name,owner},true);
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
    }
    const newSupplier=new Supplier(idSupplier,name,owner);
    const result=await supplierModel.updateOne(newSupplier);
    if(result&&result!==-1){
        res.sendStatus(204);
    }
    else if(result===-1){
        res.sendStatus(500);
    }
    else {
        res.sendStatus(404)
    }
}

const deleteOne=async(req,res)=>{
    const id=req.params.id;
    if(isNaN(id))
        return res.sendStatus(422);
    const idSupplier=parseInt(id);    
    const result= await supplierModel.deleteOne(idSupplier)
    if(result&&result!==-1){
        res.sendStatus(204);
    }
    else if(result===-1){
        res.sendStatus(500);
    }
    else {
        res.sendStatus(404)
    }
}

module.exports={
    getAll,
    getUser,
    getOne,
    addOne,
    updateOne,
    deleteOne,
}