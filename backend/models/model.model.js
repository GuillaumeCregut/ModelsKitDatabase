const Model = require('../classes/model.class');
const { dbquery } = require('../utils/dbutils');

const findAll = async (userId) => {
    let sql="SELECT null as 'liked', model_full.* FROM model_full ORDER BY name"
    if(userId!==0)
    {
        sql="SELECT m.*, model_user.state as liked FROM model_full m left join( SELECT owner,model, state FROM model_user WHERE owner=? AND state=4) as model_user ON model_user.model=m.id";
    }    
    
    const dbResult = await dbquery('get', sql,[userId]);
    if (dbResult.error===0) {
        const models = dbResult.result.map((item) => {
            const newModel = new Model(item.id, item.name, item.brand, item.builder, item.category, item.period, item.reference, item.scale);
            newModel.setBrandName(item.brandname);
            newModel.setBuilderName(item.buildername);
            newModel.setCategoryName(item.categoryname);
            newModel.setPeriodName(item.periodname);
            newModel.setScaleName(item.scalename);
            newModel.setPicture(item.picture);
            newModel.setLink(item.scalemates);
            newModel.setCountryId(item.countryid);
            newModel.setCountryName(item.countryname);
            newModel.setIsLiked(item.liked!==null)
            return newModel;
        });
        return models;
    }
    else
        return dbResult.result;
}

const findOne = async (id) => {
    const dbResult = await dbquery('get', 'SELECT * FROM model_full WHERE id=? ORDER BY name', [id]);
    if (dbResult.error===0) {
        if (dbResult.result.length > 0) {
            const item = dbResult.result[0];
            const newModel = new Model(item.id, item.name, item.brand, item.builder, item.category, item.period, item.reference, item.scale);
            newModel.setBrandName(item.brandname);
            newModel.setBuilderName(item.buildername);
            newModel.setCategoryName(item.categoryname);
            newModel.setPeriodName(item.periodname);
            newModel.setScaleName(item.scalename);
            newModel.setPicture(item.picture);
            newModel.setLink(item.scalemates);
            newModel.setCountryId(item.countryid);
            newModel.setCountryName(item.countryname);
            return newModel;
        }
        else
            return {};
    }
    else
        return dbResult.result;

}

const addOne = async (model) => {
    //Prévoir l'ajout d'image
    const result = await dbquery('add', 'INSERT INTO model (builder,category,brand,period,scale,name,reference,scalemates,picture) VALUES (?,?,?,?,?,?,?,?,?)', [
        model.builder, model.category, model.brand, model.period, model.scale, model.name, model.reference, model.link, model.picture
    ])
    if (result.error===0) {
        model.setId(result.result);
        //Getting result in text
        const dbResult = await dbquery('get', 'SELECT * FROM model_full WHERE id=? ORDER BY name', [model.id]);
        const item = dbResult.result[0];
        model.setBrandName(item.brandname);
        model.setBuilderName(item.buildername);
        model.setCategoryName(item.categoryname);
        model.setPeriodName(item.periodname);
        model.setScaleName(item.scalename);
        model.setPicture(item.picture);
        model.setLink(item.scalemates);
        return model;
    }
    else {
        return result.error;
    }
}

const updateOne = async (model) => {
    const result = await dbquery('update', 'UPDATE model SET builder=?,category=?,brand=?,period=?,scale=?,name=?,reference=?,scalemates=?,picture=? WHERE id=?', [
        model.builder, model.category, model.brand, model.period, model.scale, model.name, model.reference, model.link, model.picture,model.id
    ])
    if (result.error===0) {
        const newModel=await findOne(model.id);
        return newModel;
    }
    else
        return result.result;
}

const deleteOne = async (id) => {
    const old=await findOne(id);
    const dbResult=await dbquery('delete', 'DELETE FROM model WHERE id=?', [id]);
    if (dbResult.error==0) {
        if(old.picture)
            return {error:0, oldPicture:old.picture};
        else
            return dbResult;
    }
    else
        return dbResult;
}

const getFavorite=async(userId)=>{
        const dbResult=await dbquery('get','SELECT id,model as modelId,modelName,brandName,builderName,scaleName FROM model_favorite WHERE owner=?',[userId]);
        return dbResult;
}

const setFavorite=async(owner,modelId)=>{
    const dbResult= await dbquery('add','INSERT INTO model_user (state,owner,model) VALUES (4,?,?)',[owner,modelId])
    return dbResult
}

const unsetFavorite=async(owner,modelId)=>{
    const dbResult= await dbquery('delete','DELETE FROM model_user WHERE state=4 AND owner=? AND model=?',[owner,modelId]);
    return dbResult;
}

const getAllKitsUser=async(idUser)=>{
    const dbResult=await dbquery('get','SELECT * FROM mymodels WHERE owner=?',[idUser]);
    return dbResult;
}

const updateStock=async(id,owner,state)=>{
     const dbResult=await dbquery('update','UPDATE model_user SET state=? WHERE id=? AND owner=?',[state,id,owner]);
     return dbResult;
}

const getAllDetailsKit=async(id)=>{
    const dbResult=await dbquery('get','SELECT * FROM all_info_model WHERE id=?',[id]);
    if(dbResult.error===0){
        return dbResult.result[0];
    }
    else 
        return dbResult.result;
}

const updatePictures=async(filePath,id)=>{
    const dbResult=await dbquery('update', 'UPDATE model_user SET pictures=? WHERE id=?',[filePath,id]);
    return dbResult;
}

const getStateModelState=async(id)=>{
    const dbResult=await dbquery('get', 'SELECT count(*) as count, s.name FROM all_info_model ai  INNER JOIN state s on ai.state=s.id WHERE ai.owner=? GROUP BY ai.state;',[id]);
    return dbResult.result;
}

const getStatModelPeriod=async(id)=>{
    const dbResult=await dbquery('get', 'SELECT count(*) as count, periodName as name FROM all_info_model WHERE owner=? GROUP BY periodName;',[id]);
    return dbResult.result;
}

const getStatModelType=async(id)=>{
    const dbResult=await dbquery('get', 'SELECT count(*) as count, categoryName as name FROM all_info_model WHERE owner=? GROUP BY categoryName;',[id]);
    return dbResult.result;
}

const getStatModelProvider=async(id)=>{
    const dbResult=await dbquery('get','SELECT count(*) as count, providerName as name FROM all_info_model WHERE owner=? GROUP BY provider;',[id]);
    return dbResult.result;
}
const getStatModelScale=async(id)=>{
    const dbResult=await dbquery('get','SELECT count(*) as count, scaleName as name FROM all_info_model WHERE owner=? GROUP BY scaleName;',[id]);
    return dbResult.result;
}

const getStatModelPrice=async(id)=>{
    const dbResult=await dbquery('get','SELECT SUM(price) as sum FROM `all_info_model` WHERE owner=?;',[id]);
    return dbResult.result;
}

const getStatModelBrand=async(id)=>{
    const dbResult=await dbquery('get','SELECT count(*) as count, brandName as name FROM all_info_model WHERE owner=? GROUP BY brandName;',[id]);
    return dbResult.result;
}

const getLikedElementByIdKit=async(id)=>{
    const dbResult=await dbquery('get','SELECT model from model_user WHERE id=?',[id]);
    return dbResult;
}

const getCountLikedIdUser=async(id, owner)=>{
    const dbResult=await dbquery('get', 'SELECT count(*) as count FROM  model_user WHERE model=? AND owner=? AND state=4',[id,owner]);
    return dbResult;
}

const getRandomKit=async(userId)=>{
    const dbResult=await dbquery('get','SELECT id,modelName,reference,boxPicture,builderName,scaleName,brandName FROM `mymodels` WHERE owner=? AND state=1 ORDER BY RAND() LIMIT 1;',[userId]);
    return dbResult;
}

const getMessageCountUserModels=async(userId)=>{
    const dbResult=await dbquery('get','SELECT count(*) as numberMessages, mm.id, mm.fk_model, mu.owner FROM model_message mm INNER JOIN model_user mu ON mm.fk_model=mu.id WHERE mu.owner=? GROUP BY mm.fk_model;',[userId]);
    return dbResult;
}

module.exports = {
    findAll, //OK
    findOne, //OK
    addOne, //OK
    updateOne, //OK
    deleteOne, //OK
    getFavorite, //OK
    setFavorite, //OK
    unsetFavorite, //OK
    getAllKitsUser, //OK
    updateStock,//OK
    getAllDetailsKit, //OK
    updatePictures,
    getStateModelState,
    getStatModelPeriod,
    getStatModelType,
    getStatModelProvider,
    getStatModelScale,
    getStatModelPrice,
    getStatModelBrand,
    getLikedElementByIdKit, //OK
    getCountLikedIdUser, //OK
    getRandomKit, //OK
    getMessageCountUserModels,
}