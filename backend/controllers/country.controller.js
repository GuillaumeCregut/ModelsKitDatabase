const countryModel = require('../models/country.model');
const Country = require('../classes/Country.class');
const Joi = require('joi');

const validate = (data) => {
    return Joi.object({
        name: Joi.string().max(200).presence('required')
    }).validate(data, { abortEarly: false }).error;
}


const getAll = async (req, res) => {
    const result = await countryModel.findAll();
    if (typeof result == 'object')
        res.json(result);
    else {
        //traiter les cas si besoin, ici non
        res.sendStatus(500)
    }
}

const getOne = async (req, res) => {
    const id = req.params.id;
    const result = await countryModel.findOne(id);
    if (typeof result == 'object')
        res.json(result);
    else
        res.sendStatus(500)
}

const addCountry = async (req, res) => {
    //vérification des valeurs
    const errors = validate(req.body);
    const { name } = req.body;
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    //création de l'objet
    const country = new Country(null, name)
    //on passe l'objet au modele
    const result = await countryModel.addOne(country);
    //On envoie le nouveau élément
    if (typeof result === 'object') {
        res.status(201).json(result);
    }
    else
        res.sendStatus(500)

}

const updateCountry = async (req, res) => {
    const id = parseInt(req.params.id);
    if (id === 0 || isNaN(id)) {
        return res.status(422).send('bad Id');
    }
    const errors = validate(req.body);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const country = new Country(id, req.body.name);
    const result = await countryModel.updateOne(country);
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

const deleteCountry = async (req, res) => {
    const id = parseInt(req.params.id);
    if (id === 0 || isNaN(id)) {
        return res.status(422).send('bad Id');
    }
    const result = await countryModel.deleteOne(id);
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
module.exports = {
    getAll,
    getOne,
    addCountry,
    updateCountry,
    deleteCountry
}