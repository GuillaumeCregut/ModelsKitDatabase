const scaleModel = require('../models/scale.model');
const Scale = require('../classes/Scale.class');
const Joi = require('joi');

const validate = (data) => {
    return Joi.object({
        name: Joi.string().max(200).presence('required')
    }).validate(data, { abortEarly: false }).error;
}

const getAll = async (req, res) => {
    const result = await scaleModel.findAll();
    if (typeof result == 'object')
        res.json(result);
    else {
        //traiter les cas si besoin, ici non
        res.sendStatus(500);
    }
}

const getOne = async (req, res) => {
    const id = req.params.id;
    const result = await scaleModel.findOne(id);
    if (typeof result == 'object')
        res.json(result);
    else
        res.sendStatus(500);
}

const addOne = async (req, res) => {
    const errors = validate(req.body);
    const { name } = req.body;
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const scale = new Scale(null, name)
    const result = await scaleModel.addOne(scale);
    if (typeof result === 'object') {
        res.status(201).json(result);
    }
    else
        res.sendStatus(500);
}

const updateOne = async (req, res) => {
    const id = parseInt(req.params.id);
    if (id === 0 || isNaN(id)) {
        return res.status(422).send('bad Id');
    }
    const errors = validate(req.body);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const scale = new Scale(id, req.body.name);
    const result = await scaleModel.updateOne(scale);
    if (result.error === 0) {
        if (result.result)
            return res.sendStatus(204);
        else
            return res.sendStatus(404);
    }
    else {

        res.sendStatus(500);
    }
}

const deleteOne = async (req, res) => {
    const id = parseInt(req.params.id);
    if (id === 0 || isNaN(id)) {
        return res.status(422).send('bad Id');
    }
    const result = await scaleModel.deleteOne(id);
    if (result.error === 0) {
        if (result.result)
            return res.sendStatus(204);
        else
            return res.sendStatus(404);
    }
    else {
        const errorCode = result.result;
        let sendCode = 500;
        switch (errorCode) {
            case 1451: sendCode = 423;
                break;
            default: sendCode = 500;
        }
        res.sendStatus(sendCode);
    }
}

module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne,
}
