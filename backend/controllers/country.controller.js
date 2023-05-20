const countryModel=require('../models/country.model');
const Country=require('../classes/Country.class');
const Joi = require('joi');

const  validate=(data)=>{
    return Joi.object({
        name : Joi.string().max(200).presence('required')
    }).validate(data,{abortEarly:false}).error;
}


const getAll= async (req,res)=>{
    const result= await countryModel.findAll();
    if(result&&result!==-1)
         res.json(result);
    else if (result===-1){
        res.sendStatus(500)
    }
    else{
        res.sendStatus(404)
    }
}

const getOne=async (req,res)=>{
    const id=req.params.id;
    const result= await countryModel.findOne(id);
    if (result&&result!==-1)
    res.json(result);   
    else if (result===-1){
        res.sendStatus(500)
    }
    else{
        res.sendStatus(404)
    }  
}

const addCountry=async(req,res)=>{
    //vérification des valeurs
    const errors=validate(req.body);
    const {name}=req.body;
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
    }
    //création de l'objet
    const country=new Country(null,name)
    //on passe l'objet au modele
    const result=await countryModel.addOne(country);
    //On envoie le nouveau élément
    if(result){
        res.status(201).json(result);
    }
    else
        res.sendStatus(500)
    
}

const updateCountry=async (req,res)=>{
    const id=parseInt(req.params.id);
    if(id===0 || isNaN(id)){
        return res.status(422).send('bad Id');
    }
    const errors=validate(req.body);
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
    }
    const country=new Country(id,req.body.name);
    const result=await countryModel.updateOne(country);
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

const deleteCountry=async (req,res)=>{
    const id=parseInt(req.params.id);
    if(id===0 || isNaN(id)){
        return res.status(422).send('bad Id');
    }
    const result=await countryModel.deleteOne(id);
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
    getOne,
    addCountry,
    updateCountry,
    deleteCountry
}