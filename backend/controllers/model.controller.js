const { logError, logInfo, logWarning } = require('../utils/logEvent');
const Model = require('../classes/model.class');
const modelModel = require('../models/model.model');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const deletePath = (filePathToDelete) => { //Vérifier si tout est OK
    const filePath = path.join(__dirname, '..', filePathToDelete);
    var list = fs.readdirSync(filePath);
    for (var i = 0; i < list.length; i++) {
        var filename = path.join(filePath, list[i]);
        var stat = fs.statSync(filename);

        if (filename == "." || filename == "..") {
            // pass these files
        } else if (stat.isDirectory()) {
            // rmdir recursively
            rmdir(filename);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(filePath);
}

const validate = (data, option) => {
    const presence = option ? 'required' : 'optional'
    return Joi.object({
        name: Joi.string().max(200).presence(presence),
        reference: Joi.string().max(200).presence(presence),
        brand: Joi.number().integer().presence(presence),
        builder: Joi.number().integer().presence(presence),
        scale: Joi.number().integer().presence(presence),
        category: Joi.number().integer().presence(presence),
        period: Joi.number().integer().presence(presence),
        scalemates: Joi.string().max(200).presence('optional'),
    }).validate(data, { abortEarly: false }).error;
}

const validateFavorite = (data) => {
    return Joi.object({
        modelId: Joi.number().min(1).presence('required'),
        owner: Joi.number().min(1).presence('required'),
        like: Joi.boolean().presence('required'),
    }).validate(data, { abortEarly: false }).error;
}

const validateStock = (data) => {
    return Joi.object({
        id: Joi.number().min(1).presence('required'),
        owner: Joi.number().min(1).presence('required'),
        newState: Joi.number().min(1).presence('required')
    }).validate(data, { abortEarly: false }).error;
}

const getAll = async (req, res) => {
    const { user_id } = req.user || 0;
    const result = await modelModel.findAll(user_id);
    if (typeof result === 'object') {
        return res.json(result)
    }
    else
        return res.sendStatus(500);
}

const getOne = async (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(422);
    }
    const id = parseInt(req.params.id);
    const result = await modelModel.findOne(id);
    if (typeof result === 'object') {
        return res.json(result)
    }
    else
        return res.sendStatus(500);
}

const addOne = async (req, res) => {
    //See to store picture
    const picture = req?.file?.path;
    const { name, brand, builder, category, period, scale, reference, scalemates } = req.body;
    const errors = validate({ name, brand, builder, category, period, scale, reference, scalemates }, true);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    //sanitizing datas
    const brandI = parseInt(brand);
    const builderI = parseInt(builder);
    const categoryI = parseInt(category);
    const periodI = parseInt(period);
    const scaleI = parseInt(scale);
    const newModel = new Model(null, name, brandI, builderI, categoryI, periodI, reference, scaleI);
    if (scalemates) {
        newModel.setLink(scalemates);
    }
    newModel.setPicture(picture);
    const result = await modelModel.addOne(newModel);
    if (typeof result === 'object')
        return res.status(201).json(result);
    else
        return res.sendStatus(500);
}

const updateOne = async (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(422);
    }
    const id = parseInt(req.params.id);
    //See to store picture
    const picture = req?.file?.path;
    const { name, brand, builder, category, period, scale, reference, scalemates } = req.body;
    const errors = validate({ name, brand, builder, category, period, scale, reference, scalemates }, false);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    let brandI = parseInt(brand);
    let builderI = parseInt(builder);
    let categoryI = parseInt(category);
    let periodI = parseInt(period);
    let scaleI = parseInt(scale);
    const oldModel = await modelModel.findOne(id);
    if (!brandI) {
        brandI = oldModel.brand;
    }
    if (!builderI) {
        builderI = oldModel.builder;
    }
    if (!categoryI) {
        categoryI = oldModel.category;
    }
    if (!periodI)
        periodI = oldModel.period;
    if (!scaleI)
        scaleI = oldModel.scale;

    const newModel = new Model(oldModel.id, name, brandI, builderI, categoryI, periodI, reference, scaleI);
    newModel.setLink(scalemates ? scalemates : oldModel.link);
    newModel.setPicture(picture ? picture : oldModel.picture);
    const result = await modelModel.updateOne(newModel);
    if (typeof result === 'object') {
        ////Remove old picture
        if (oldModel.picture && oldModel.picture != '' && picture) {
            try {
                const filePath = path.join(__dirname, '..', result);
                fs.unlinkSync(filePath);
            }
            catch (err) {
                //Log le result
                console.error('Erreur de suppression');
                await logError(`modelController : erreur de suppression d'images id : ${id}`);
            }
        }
        return res.status(200).json(result);
    }
    else {
        res.sendStatus(500)
    }
}

const deleteOne = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    const idNum = parseInt(id);
    const result = await modelModel.deleteOne(idNum);
    if (result.error === 0) {
        if (result?.oldPicture) {
            try {
                const filePath = path.join(__dirname, '..', result.oldPicture);
                fs.unlinkSync(filePath);
                return res.sendStatus(204);
            }
            catch (err) {
                await logError(`modelController : erreur de suppression d'images id : ${id}`);
                return res.status(204).send("Le fichier n'as pu être supprimer");
            }
        }
        else
            return res.sendStatus(204);
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

const setFavorite = async (req, res) => {
    const errors = validateFavorite(req.body);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const { owner, modelId, like } = req.body;
    let result = null;
    if (like) {
        result = await modelModel.setFavorite(owner, modelId);
    }
    else {
        result = await modelModel.unsetFavorite(owner, modelId);
    }
    if (result.error === 0) {
        return res.sendStatus(204);
    }
    else {
        return res.sendStatus(500)
    }
}

const getFavorite = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    const userId = parseInt(id);
    const result = await modelModel.getFavorite(userId);
    if (result.error === 0)
        return res.json(result.result);
    else
        return res.sendStatus(500)
}

const getStock = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    const userId = parseInt(id);
    const result = await modelModel.getAllKitsUser(userId);
    if (result.error === 0)
        return res.json(result.result)
    else {
        await logInfo(`ModelController.getStock : ${result.result}`);
        return res.sendStatus(500);
    }
}

const updateStock = async (req, res) => {
    const errors = validateStock(req.body);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const { owner, id, newState } = req.body;
    //Before changing, see if it is a favorite
    if (newState === 4) {
        const resultIdKit = await modelModel.getLikedElementByIdKit(id);
        if (resultIdKit.error === 1)
            return res.sendStatus(500);
        const resultIdModel = resultIdKit.result[0].model;
        const isLiked = await modelModel.getCountLikedIdUser(resultIdModel, owner);
        if (isLiked.error === 1)
            return res.sendStatus(500);
        if (isLiked.result[0].count >= 1) {
            return res.sendStatus(409);
        }
    }
    const result = await modelModel.updateStock(id, owner, newState);
    if (result.error === 0) {
        return res.sendStatus(204);
    }
    else
        return res.sendStatus(500);
}

const getAllInfoKit = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    const idKit = parseInt(id);
    const idUser = parseInt(req.params.iduser, 10);
    if (idUser !== req.user.user_id) {
        return res.sendStatus(401);
    }
    const result = await modelModel.getAllDetailsKit(idKit);
    if (typeof result === 'object') {
        //Get all images and add them to responses
        if (result.pictures) {
            const basePath = result.pictures;
            const fileArray = [];
            const pathModel = path.join(__dirname, '..', basePath);
            await fs.promises.readdir(pathModel)
                .then(filenames => {
                    for (let filename of filenames) {
                        fileArray.push(filename)
                    }
                })
                .catch(async (err) => {
                    console.error(err)
                    await logError(`ModelController.getAllInfoKit : ${err}`);
                })
            const pictures = {
                baseFolder: basePath,
                files: fileArray
            }
            result.pictures = pictures;
        }
        return res.json(result);
    }
    else {
        await logInfo(`ModelController.getAllInfoKit : ${result}`);
        return res.sendStatus(500)
    };
}

const addUserPictures = async (req, res) => {
    const fileOk = req?.fileOk;
    if (fileOk) {
        //Ajoute à la BDD
        const filesPath = req?.filePath;
        if (filesPath && filesPath != '') {
            const id = parseInt(req.params.id);
            //Si on rencontre un souci, alors on fait marche arrière sur le répertoire créé
            const dbResult = await modelModel.updatePictures(filesPath, id);
            if (dbResult.error === 0) {
                if (dbResult.result)
                    return res.sendStatus(204);
                else {
                    try {
                        fs.unlinkSync(path.join(filesPath, req.fileName));
                    }
                    catch {
                        await logWarning(`Suppression de ${filesPath}/${req.fileName} impossible`)
                    }
                    return res.sendStatus(404);
                }
            }
            else {
                try {
                    fs.unlinkSync(path.join(filesPath, req.fileName));
                }
                catch {
                    await logWarning(`Suppression de ${filesPath}/${req.fileName} impossible`)
                }
                res.sendStatus(500)
            }
        }
        else
            return res.sendStatus(418);
    }
    else {
        deletePath(filesPath);
        return res.sendStatus(500);
    }
}

const deleteUserPicture = async (req, res) => {
    if (isNaN(req.params.id))
        return res.sendStatus(422);
    const userId = req.user.user_id;
    const id = req.params.id;
    const filename = req.query.file;
    const filePath = path.join(__dirname, '..', 'assets', 'uploads', 'users', `${userId}`, id, filename);
    try {
        fs.unlinkSync(filePath);
        const pathUser = path.join(__dirname, '..', 'assets', 'uploads', 'users', `${userId}`, id);
        try {
            if (fs.readdirSync(pathUser).length === 0) {
                fs.rmdirSync(pathUser);
                await modelModel.updatePictures(null,id)
            }
        }
        catch(err){
            logError(`ModelController.deleteUserPicture :${err}`);
            console.log(err)
        }
        return res.sendStatus(204);
    }
    catch (err) {
        logError(`ModelController.deleteUserPicture :${err}`);
        console.error(err);
        res.sendStatus(500);
    }

}

const getStat = async (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(422);
    }
    const datas = {};
    const id = req.params.id;

    //Get state result
    const stateResult = await modelModel.getStateModelState(id);
    if (stateResult && stateResult !== -1) {
        datas.state = stateResult;
    }
    else if (stateResult === -1)
        return res.sendStatus(500);

    //Get period result
    const perdiodResult = await modelModel.getStatModelPeriod(id);
    if (perdiodResult && perdiodResult !== -1) {
        datas.period = perdiodResult;
    }
    else if (perdiodResult === -1)
        return res.sendStatus(500);

    //get Category result
    const categoryResult = await modelModel.getStatModelType(id);
    if (categoryResult && categoryResult !== -1) {
        datas.category = categoryResult;
    }
    else if (categoryResult === -1)
        return res.sendStatus(500);

    //get provider result
    const providerResult = await modelModel.getStatModelProvider(id);
    if (providerResult && providerResult !== -1) {
        datas.provider = providerResult;
    }
    else if (providerResult === -1)
        return res.sendStatus(500);

    //get scale result
    const scaleResult = await modelModel.getStatModelScale(id);
    if (scaleResult && scaleResult !== -1) {
        datas.scale = scaleResult;
    }
    else if (scaleResult === -1)
        return res.sendStatus(500);
    //get brand result
    const brandResult = await modelModel.getStatModelBrand(id);
    if (brandResult && brandResult !== -1) {
        datas.brand = brandResult;
    }
    else if (brandResult === -1)
        return res.sendStatus(500);

    //get price info
    const priceResult = await modelModel.getStatModelPrice(id);
    if (priceResult && priceResult !== -1) {
        datas.price = priceResult[0].sum;
    }
    else if (priceResult === -1)
        return res.sendStatus(500);
    res.json(datas);
}

const getRandom = async (req, res) => {
    const idUser = req.user.user_id;
    const result = await modelModel.getRandomKit(idUser);
    if (result.error === 0) {
        return res.json(result.result[0])
    }
    else
        return res.sendStatus(500);
}


module.exports = {
    getAll, //OK
    getOne, //OK
    addOne, //OK
    updateOne, //OK
    deleteOne, //OK
    setFavorite, //OK
    getFavorite, //OK 
    getStock, //OK
    updateStock, //OK
    getAllInfoKit, //OK
    addUserPictures, //OK
    deleteUserPicture, //OK
    getStat,
    getRandom, //OK
}