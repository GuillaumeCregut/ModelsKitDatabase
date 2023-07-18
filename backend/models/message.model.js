const { dbquery } = require('../utils/dbutils');

const getMessages=async(id1, id2)=>{
    const dbResult=dbquery('get','SELECT * FROM `private_message` WHERE (exp=? and dest=?) OR (exp=? and dest=?) ORDER BY date_m DESC;',[id1,id2,id2,id1]);
    return dbResult;
}

const setRead=async(exp,dest)=>{
    const dbResult=dbquery('update','UPDATE private_message SET is_read=1 WHERE (dest=? and exp=?)',[dest,exp]);
    return dbResult;
}

const addMessagePrivate=async(exp,dest,message)=>{
    const dbResult=dbquery('add','INSERT INTO private_message (exp,dest,message) VALUES (?,?,?)',[exp,dest,message]);
    return dbResult;
}

const getAllowed=async(id)=>{
    const dbResult=await dbquery('get','SELECT allow FROM user WHERE id=?',[id]);
    return  dbResult;
}

const addMessage=async(exp,message,idModel)=>{
    const dbResult=await dbquery('add','INSERT INTO model_message (fk_model, fk_author, date_message, message) VALUES(?,?,now(),?);',[idModel,exp,message]);
    return dbResult;
}

module.exports={
    getMessages,
    setRead,
    addMessagePrivate,
    getAllowed,
    addMessage
}