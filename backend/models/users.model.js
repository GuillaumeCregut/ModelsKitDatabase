const { dbquery } = require('../utils/dbutils');
const User=require('../classes/User.class');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,login, email FROM user');
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new User(element.firstname,element.lastname,element.login,null,element.rankUser,element.email,element.id);
            return item;
        });
        return resultat;
    }
    else if(dbResult===-1)
    {
        return undefined;
    }
    else
        return -1;

}

const findOne=async(id)=>{
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,login, email FROM user WHERE id=?',[id]);
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new User(element.firstname,element.lastname,element.login,null,element.rankUser,element.email,element.id);
            return item;
        });
        return resultat;
    }
    else if(dbResult===-1)
    {
        return undefined;
    }
    else
        return -1;

}

const findOneByLogin=async (login)=>{
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,passwd FROM user WHERE login=?',[login]);
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new User(element.firstname,element.lastname,login,element.passwd,element.rankUser,null,element.id);
            return item;
        });
        return resultat;
    }
    else if(dbResult===-1)
    {
        return undefined;
    }
    else
        return -1;

}


const addUser=async(user)=>{
    
    const paramsArray=Object.values(user);
    const [id,...params]=paramsArray;
    const checkUnique=await dbquery('get','SELECT count(*) as nb FROM `user` WHERE login=? OR email=?',[user.login,user.email]);
    const nbUser=checkUnique[0].nb;
    if(nbUser>0){
        return -2;
    }
    const dbResult= await dbquery('add','INSERT INTO user (firstname, lastname, login,passwd,rankUser, email) VALUES(?,?,?,?,?,?)',params)
    if (dbResult != -1) {
        user.setId(dbResult);
        user.password=null;
        return user;
    }
    else {
        return undefined;
    }
}

const updateUser=async(user)=>{
    const {id}=user;
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,login, passwd, email FROM user WHERE id=?',[id]);
    if(dbResult.length>0){
        const {firstname,lastname,login,passwd,rankUser,email}=dbResult[0];
        user.update(firstname,lastname,login,passwd,rankUser,email,id);
        const dbUpdate = await dbquery('update', 'UPDATE user SET firstname=?,lastname=?,rankUser=?,login=?,email=?,passwd=?  WHERE id=?', [
            user.firstname,
            user.lastname,
            user.rank,
            user.login,
            user.email,
            user.password,
             id]);
        return dbUpdate;
    }
    else{
        return 0;
    }

}

const updateRank=async(id,rank)=>{
    const dbResult = await dbquery('get', 'UPDATE  user set rankUser=? WHERE id=?',[rank,id]);
    return dbResult;
}

const deleteUser=async(id)=>{
    const dbResult = await dbquery('delete', 'DELETE FROM user WHERE id=?', [id]);
    return dbResult;
}

const setToken=async(token,id)=>{
    const dbResult= await dbquery('update','UPDATE user SET refreshToken=? WHERE id=?',[token,id]);
    return dbResult;
}

const deleteTokenDb=async(token)=>{
    const dbResult= await dbquery('update','UPDATE user SET refreshToken=null WHERE refreshToken=?',[token]);
    return dbResult;
}


const findUserByToken=async(token)=>{
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser FROM user WHERE refreshToken=?',[token]);
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new User(element.firstname,element.lastname,element.login,element.passwd,element.rankUser,null,element.id);
            return item;
        });
        return resultat;
    }
    else if(dbResult===-1)
    {
        return undefined;
    }
    else
        return -1;
}

const findCredentialsByUser=async(firsname,lastname,token)=>{
    const dbResult = await dbquery('get', 'SELECT firstname, lastname, rankUser, id  FROM user WHERE (firstname=? and lastname=? and refreshToken=?)', [firsname,lastname,token]);
    return dbResult[0];
    
}

const addModelInStock=async(user,model)=>{
    const dbResult=dbquery('add','INSERT INTO model_user (state,owner,model) VALUES (1,?,?)',[user,model]);
    if (dbResult && dbResult != -1) {
        return dbResult;
    }
    else {
        return undefined;
    }

}

const getModelStockById=async(id,idUser)=>{
    const dbResult=await dbquery('get','SELECT * FROM model_user WHERE owner=? AND id=?',[idUser,id]);
    if (dbResult && dbResult != -1) {
        return dbResult;
    }
    else {
        //A Améliorer avec le retour des états MySql
        return [];
    }
}

const deleteModelStock=async(id)=>{
    const dbResult=await dbquery('delete','DELETE FROM model_user WHERE id=?',[id]);
    return dbResult;
}

module.exports={
    addUser,
    findAll,
    findOne,
    deleteUser,
    updateUser,
    findOneByLogin,
    setToken,
    deleteTokenDb,
    findUserByToken,
    findCredentialsByUser,
    addModelInStock,
    updateRank,
    getModelStockById,
    deleteModelStock,
}