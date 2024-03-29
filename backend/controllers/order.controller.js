const Order = require('../classes/Order.class');
const orderModel = require('../models/order.model');
const Joi = require('joi');
const { required } = require('joi');

const validate = (data, option = true) => {
    const presence = option ? 'required' : 'optional';
    return Joi.object({
        reference: Joi.string().max(200).presence(presence),
        supplier: Joi.number().integer().presence(presence),
        owner: Joi.number().integer().presence(presence),
        dateOrder:Joi.date().presence(presence),
    }).validate(data, { abortEarly: false }).error;
}

const validateList = (data, option = true) => {
    const presence = option ? 'required' : 'optional';

    const schema =
        Joi.object({
            idModel: Joi.number().integer().required(),
            price: Joi.number().required(),
            qtty: Joi.number().min(1).integer().required()
        })
    return Joi.array().items(schema).validate(data).error;
}

const getAll = async (req, res) => {
    const resultOrder = await orderModel.findAll();
    if (typeof resultOrder == 'object')
        return res.json(resultOrder);
    else
        return res.sendStatus(500);
}

const getAllUser = async (req, res) => {
    //Get all orders from one user
    const id = req.params.id;
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    const idUser = parseInt(id);
    const resultOrder = await orderModel.findAllUser(idUser);
    if (typeof resultOrder==='object')
        return res.json(resultOrder);
    else
        return res.sendStatus(500);
}

const getOne = async (req, res) => {
    id = req.params.id;
    const result = await orderModel.findOne(id);
    if (typeof result ==='object') {
        res.json(result);
    }
    else
        return res.sendStatus(500);
}

const addOne = async (req, res) => {
    //check if datas OK
    const { owner, reference, supplier, list, dateOrder } = req.body;
    const errors = validate({ owner, reference, supplier,dateOrder });
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    //check list 
    const errorsList = validateList(list);
    if (errorsList) {
        const errorList = errorsList.details[0].message;
        return res.status(422).send(errorList);
    }
    const order = new Order(supplier, owner, reference,dateOrder);
    list.forEach((item) => {
        order.addModels(item);
    })
    const result = await orderModel.addOne(order);
    if (result && typeof (result) === "object") {
        return res.status(201).json(result);
    }
    else if (result === -1) {
        res.sendStatus(409)
    }
    else if (result === -2) {
        return res.sendStatus(422);
    }
    else {
        return res.sendStatus(500);
    }
}

const updateOne = async (req, res) => {
    res.sendStatus(418);
}

const deleteOne = async (req, res) => {
    id = req.params.id;
    const result = await orderModel.deleteOne(id);
    if (typeof result==='object') {
        if (result.result)
            return res.sendStatus(204);
        else
            return res.sendStatus(404);
    }
    else
        return res.sendStatus(500)
}

module.exports = {
    getOne,
    getAll,
    addOne,
    updateOne,
    deleteOne,
    getAllUser,
}