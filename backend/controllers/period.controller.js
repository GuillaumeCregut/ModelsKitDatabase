const periodModel = require('../models/period.model');
const Period = require('../classes/Period.class');
const Joi = require('joi');

const validate = (data) => {
    return Joi.object({
        name: Joi.string().max(200).presence('required')
    }).validate(data, { abortEarly: false }).error;
}

const getAll = async (req, res) => {
    const result = await periodModel.findAll();
    if (typeof result == 'object')
        res.json(result);
    else {
        //traiter les cas si besoin, ici non
        res.sendStatus(500)
    }
}

const getOne = async (req, res) => {
    const id = req.params.id;
    const result = await periodModel.findOne(id);
    if (typeof result == 'object')
        res.json(result);
    else
        res.sendStatus(500)
}

const addOne = async (req, res) => {
    const errors = validate(req.body);
    const { name } = req.body;
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    //création de l'objet
    const period = new Period(null, name)
    //on passe l'objet au modele
    const result = await periodModel.addOne(period);
    //On envoie le nouveau élément
    if (typeof result === 'object') {
        res.status(201).json(result);
    }
    else
        res.sendStatus(500)
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
    const period = new Period(id, req.body.name);
    const result = await periodModel.updateOne(period);
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
    const result = await periodModel.deleteOne(id);
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