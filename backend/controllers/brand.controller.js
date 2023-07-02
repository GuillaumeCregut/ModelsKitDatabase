const Brand = require('../classes/Brand.class');
const brandModel = require('../models/brand.model');
const Joi = require('joi');

const validate = (data) => {
    return Joi.object({
        name: Joi.string().max(200).presence('required')
    }).validate(data, { abortEarly: false }).error;
}

const getAll = async (req, res) => {
    const result = await brandModel.findAll();
    if (typeof result == 'object')
        res.json(result);
    else {
        //traiter les cas si besoin, ici non
        res.sendStatus(500)
    }

};

const getOne = async (req, res) => {
    const id = req.params.id;
    const result = await brandModel.findOne(id);
    if (typeof result == 'object')
        res.json(result);
    else
        res.sendStatus(500)
};

const addOne = async (req, res) => {
    const errors = validate(req.body);
    const { name } = req.body;
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    //création de l'objet
    const brand = new Brand(null, name)
    //on passe l'objet au modele
    const result = await brandModel.addOne(brand);
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
    const country = new Brand(id, req.body.name);
    const result = await brandModel.updateOne(country);
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
    const result = await brandModel.deleteOne(id);
    if (result.error === 0) {
        if (result.result)
            return res.sendStatus(204);
        else
            return res.sendStatus(404);
    }
    else {

        res.sendStatus(500);
    }
};

module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne,
}