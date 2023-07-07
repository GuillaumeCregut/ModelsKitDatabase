const { logError } = require('../utils/logEvent');
const userModel = require('../models/users.model');
const User = require('../classes/User.class');
const Joi = require('joi');
const { encrypt } = require('../utils/crypto');
const fs = require('fs');
const path = require('path');
const { createSubUpload } = require('../utils/fs');
const { type } = require('os');

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        firstname: Joi.string().max(200).presence(presence),
        lastname: Joi.string().max(200).presence(presence),
        password: Joi.string().max(200).presence(presence),
        login: Joi.string().max(200).presence(presence),
        email: Joi.string().email().presence(presence),
        rank: Joi.number().integer().presence('optional'),
        isVisible:Joi.boolean().presence('optional')
    }).validate(data, { abortEarly: false }).error;
}

const validateModel = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        user: Joi.number().integer().presence(presence),
        model: Joi.number().integer().presence(presence),
    }).validate(data, { abortEarly: false }).error;
}

const getAll = async (req, res) => {
    const result = await userModel.findAll();
    if (typeof result === 'object')
        res.json(result);
    else {
        res.sendStatus(500)
    }
}

const getAllVisible = async (req, res) => {
    const result = await userModel.findVisible();
    if (typeof result === 'object')
        res.json(result);
    else {
        res.sendStatus(500)
    }
}

const getOne = async (req, res) => {
    const id = req.params.id;
    const result = await userModel.findOne(id);
    if (typeof result === 'object') {
        if (result.length > 0)
            res.json(result[0]);
        else
            res.sendStatus(404)
    }

    else {
        res.sendStatus(500)
    }
}

const addOne = async (req, res) => {
    const errors = validate(req.body);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }

    let { rank } = req.body;
    if (!rank) {
        rank = 1;
    }

    const { password, firstname, lastname, email, login } = req.body;
    let encryptedPassword = await encrypt(password);

    const payload = new User(
        firstname,
        lastname,
        login,
        encryptedPassword,
        rank,
        email
    )
    const result = await userModel.addUser(payload);
    if (typeof result !== 'object') {
        if (result === -2) {
            return res.sendStatus(409);
        }
        else
            return res.sendStatus(500);
    }
    else {
        createSubUpload(`users/${result.id}`);
        res.status(201).json(result);
    }
}

const updateUser = async (req, res) => {
    const avatar=null; //will come from multer
    const errors = validate(req.body, false);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const id = parseInt(req.params.id);
    if (id === 0 || isNaN(id)) {
        return res.status(422).send('bad Id');
    }
    const { password, firstname, lastname, email, login, rank,isVisible } = req.body;
    let encryptedPassword = '';
    if (password) {
        encryptedPassword = await encrypt(password);
    }
    else {
        encryptedPassword = undefined;
    }
    const payload = new User(
        firstname,
        lastname,
        login,
        encryptedPassword,
        rank,
        email,
        isVisible,
        avatar,
        id
    )
    const result = await userModel.updateUser(payload);
    if (typeof result === 'object') {
        if (result.result)
            res.sendStatus(204);
        else
            return res.sendStatus(404)
    }
    else
        res.sendStatus(500);
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    if (id === 0 || isNaN(id)) {
        return res.status(422).send('bad Id');
    }
    const result = await userModel.deleteUser(id);
    if (result.error===0) {
        if (!result.result){
            return res.sendStatus(404);
        }
        //unlink userfolder  
        try {
            const dirPath = path.join(__dirname, '..', 'assets', 'uploads', 'users', id.toString());
            fs.rmSync(dirPath, { recursive: true, force: true });;
        }
        catch (err) {
            //Log le result
            logError(`UserController.deleteUser : ${err}`)
            console.error('Erreur de suppression')

        }
        res.sendStatus(204);
    }
    else 
        res.sendStatus(500);
}

const addModelStock = async (req, res) => {
    //Check if user is the correct user
    const errors = validateModel(req.body);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const { user, model } = req.body;
    const result = await userModel.addModelInStock(user, model);

    if (result.error===0) {
        const modelResult = await userModel.getModelStockInfoById(result.result);
        return res.status(201).json(modelResult);
    }
    else
        return res.sendStatus(500);
}

const updateRank = async (req, res) => {
    if (!req.body.rank) {
        return res.sendStatus(422);
    }
    const errors = validate(req.body, false);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    if (isNaN(req.params.id))
        return res.sendStatus(422);
    const id = parseInt(req.params.id, 10);
    const result = await userModel.updateRank(id, req.body.rank);
    if (result.error===0) {
        if(result.result)
            return res.sendStatus(204);
        else   
            return res.sendStatus(404);
    }
    else
        return res.sendStatus(500);
}

const deleteModel = async (req, res) => {

    const modelId = parseInt(req.params.id);
    if (modelId === 0 || isNaN(modelId)) {
        return res.status(422).send('bad Id');
    }
    const idUser = req.user.user_id;
    //Récupère les infos du modèle à supprimer
    const result = await userModel.getModelStockById(modelId, idUser);
    //Améliorer le retour lors de la migration du back end
    if (result.length === 0)
        return res.sendStatus(404);
    const files = result[0].pictures;
    if (files) {
        try {
            const dirPath = path.join(__dirname, '..', files);
            fs.rmSync(dirPath, { recursive: true, force: true });;
        }
        catch (err) {
            //Log le result
            logError(`UserController.deleteUser : ${err}`)
            console.error('Erreur de suppression')

        }
    }
    const resultDelete = await userModel.deleteModelStock(modelId);
    if (resultDelete.error===0) {
        if(resultDelete.result)
            return res.sendStatus(204);
        else
            return satisfies.sendStatus(404);
    }
    else if (result === -1) {
        res.sendStatus(500);
    }
    else {
        res.sendStatus(404);
    }
}

module.exports = {
    getAll,  //OK
    getAllVisible,
    getOne, //OK
    addOne, //OK
    updateUser, //OK
    deleteUser, //OK
    addModelStock, //OK
    updateRank, //OK
    deleteModel, //A tester
}