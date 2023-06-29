const Builder = require('../classes/Builder.class');
const builderModel = require('../models/builder.model');
const countryModel = require('../models/country.model');
const Joi = require('joi');

const validate = (data, option) => {
    const presence = option ? 'required' : 'optional'
    return Joi.object({
        name: Joi.string().max(200).presence(presence),
        country: Joi.number().integer().presence(presence)
    }).validate(data, { abortEarly: false }).error;
}


const getAll = async (req, res) => {
    const result = await builderModel.findAll();
    if (result && result !== -1)
        res.json(result);
    else if (result === -1) {
        res.sendStatus(404)
    }
    else {
        res.sendStatus(500)
    }
}

const getOne = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    const idNum = parseInt(id);
    const result = await builderModel.findOne(idNum);
    if (result && result !== -1)
        res.json(result);
    else if (result === -1) {
        res.sendStatus(404)
    }
    else {
        res.sendStatus(500)
    }
}

const addOne = async (req, res) => {
    const { name, country } = req.body;
    const errors = validate({ name, country }, true)
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const newBuilder = new Builder(null, name, country);
    const result = await builderModel.addOne(newBuilder);
    if (result) {
        return res.status(201).json(result);
    }
    else
        res.sendStatus(500);
}

const updateOne = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    const idNum = parseInt(id);
    const { name, country } = req.body;
    const errors = validate({ name, country }, true);
    if (errors) {
        const error = errors.details[0].message;
        console.log(error)
        return res.status(422).send(error);
    }
    const newBuilder = new Builder(idNum, name, country);
    const result = await builderModel.updateOne(newBuilder);
    if (result && result !== -1) {
        const countryName = await countryModel.findOne(country);
        if (countryName && countryName !== -1){
           return res.json(countryName);
        }
        else if (countryName === -1) {
           return res.sendStatus(500)
        }
        else {
          return  res.sendStatus(404)
        }
    }
    else if (result === -1) {
        res.sendStatus(500)
    }
    else
        res.sendStatus(404)
}

const deleteOne = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    const idNum = parseInt(id);
    const result = await builderModel.deleteOne(idNum);
    if (result && result !== -1) {
        res.sendStatus(204);
    }
    else if (result === -1) {
        res.sendStatus(500)
    }
    else
        res.sendStatus(404)
}

module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne,
}