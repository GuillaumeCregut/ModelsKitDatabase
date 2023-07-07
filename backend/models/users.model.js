const { dbquery } = require('../utils/dbutils');
const User = require('../classes/User.class');

const findAll = async () => {
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,login,isVisible,avatar,allow, email FROM user');
    if (dbResult.error === 0) {
        const resultat = dbResult.result.map(element => {
            const item = new User(element.firstname, element.lastname, element.login, null, element.rankUser, element.email,element.isVisible,element.avatar,element.allow ,element.id);
            return item;
        });
        return resultat;
    }
    else
        return dbResult.result;

}
const findVisible = async () => {
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,avatar FROM user WHERE isVisible=true');
    if (dbResult.error === 0) {
        const resultat = dbResult.result.map(element => {
            const item ={firstname:element.firstname, lastanme:element.lastname,avatar:element.avatar ,id:element.id};
            return item;
        });
        return resultat;
    }
    else
        return dbResult.result;

}

const findOne = async (id) => {
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,login, email,isVisible,avatar,allow FROM user WHERE id=?', [id]);
    if (dbResult.error === 0) {
        const dbArray = dbResult.result;
        const resultat = dbArray.map(element => {
            const item = new User(element.firstname, element.lastname, element.login, null, element.rankUser, element.email,element.isVisible,element.avatar, element.allow ,element.id);
            return item;
        });
        return resultat;
    }
    else
        return dbResult.result
}

const findOneByLogin = async (login) => {
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,passwd,avatar FROM user WHERE login=?', [login]);
    if (dbResult.error === 0) {
        const dbArray = dbResult.result;
        const resultat = dbArray.map(element => {
            const item = new User(element.firstname, element.lastname, login, element.passwd, element.rankUser, null,null,element.avatar ,null,element.id);
            return item;
        });
        return resultat;
    }
    else
        return dbResult.result;

}


const addUser = async (user) => {

    const paramsArray = Object.values(user);
    const [id, ...params] = paramsArray;
    const checkUnique = await dbquery('get', 'SELECT count(*) as nb FROM `user` WHERE login=? OR email=?', [user.login, user.email]);
    if (checkUnique.error === 0) {
        const nbUser = checkUnique.result[0].nb;
        if (nbUser > 0) {
            return -2;
        }
    }
    const dbResult = await dbquery('add', 'INSERT INTO user (firstname, lastname, login,passwd,rankUser, email) VALUES(?,?,?,?,?,?)', params)
    if (dbResult.error === 0) {
        user.setId(dbResult.result);
        user.password = null;
        return user;
    }
    else {
        return dbResult.result;
    }
}

const updateUser = async (user) => {
    const { id } = user;
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,login, passwd,isVisible,avatar,allow, email FROM user WHERE id=?', [id]);
    if (dbResult.error=== 0) {
        if (dbResult.result.length > 0) {
            const { firstname, lastname, login, passwd, rankUser, email,isVisible,avatar,allow } = dbResult.result[0];
            user.update(firstname, lastname, login, passwd, rankUser, email,isVisible,avatar,allow);
            const dbUpdate = await dbquery('update', 'UPDATE user SET firstname=?,lastname=?,rankUser=?,login=?,email=?,passwd=?,isVisible=?,avatar=?,allow=?  WHERE id=?', [
                user.firstname,
                user.lastname,
                user.rank,
                user.login,
                user.email,
                user.password,
                user.isVisible,
                user.avatar,
                user.allow,
                id]);
            return dbUpdate;
        }
    }
    else {
        return dbResult.result;
    }

}

const updateRank = async (id, rank) => {
    const dbResult = await dbquery('get', 'UPDATE  user set rankUser=? WHERE id=?', [rank, id]);
    return dbResult;
}

const deleteUser = async (id) => {
    const dbResult = await dbquery('delete', 'DELETE FROM user WHERE id=?', [id]);
    return dbResult;
}

const setToken = async (token, id) => {
    const dbResult = await dbquery('update', 'UPDATE user SET refreshToken=? WHERE id=?', [token, id]);
    return dbResult;
}

const deleteTokenDb = async (token) => {
    const dbResult = await dbquery('update', 'UPDATE user SET refreshToken=null WHERE refreshToken=?', [token]);
    return dbResult;
}


const findUserByToken = async (token) => {
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser FROM user WHERE refreshToken=?', [token]);
    if (dbResult.error === 0) {
        const resultat = dbResult.result.map(element => {
            const item = new User(element.firstname, element.lastname, element.login, element.passwd, element.rankUser, null, element.id);
            return item;
        });
        return resultat;
    }
    else
        return dbResult.result;
}

const findCredentialsByUser = async (firsname, lastname, token) => {
    const dbResult = await dbquery('get', 'SELECT firstname, lastname, rankUser, id  FROM user WHERE (firstname=? and lastname=? and refreshToken=?)', [firsname, lastname, token]);
    if (dbResult.error === 0)
        return dbResult.result[0];
    return dbResult.result;

}

const addModelInStock = async (user, model) => {
    const dbResult = await dbquery('add', 'INSERT INTO model_user (state,owner,model) VALUES (1,?,?)', [user, model]);
    return dbResult;

}

const getModelStockInfoById = async (id) => {
    const dbResult = await dbquery('get', 'SELECT * FROM mymodels WHERE id=?', [id]);
    return dbResult.result[0];
}

const getModelStockById = async (id, idUser) => {
    const dbResult = await dbquery('get', 'SELECT * FROM model_user WHERE owner=? AND id=?', [idUser, id]);
    if (dbResult.error===0) {
        return dbResult.result;
    }
    else {
        //A Améliorer avec le retour des états MySql
        return [];
    }
}

const deleteModelStock = async (id) => {
    const dbResult = await dbquery('delete', 'DELETE FROM model_user WHERE id=?', [id]);
    return dbResult;
}

const updateAvatar=async(filename, id)=>{
    const dbResult=await dbquery('update','UPDATE user SET avatar=? WHERE id=?',[filename,id]);
    return dbResult;
}

module.exports = {
    addUser, //OK
    findAll, //OK
    findVisible,
    findOne, //OK
    deleteUser, //OK
    updateUser, //OK
    findOneByLogin, //OK
    setToken, //OK
    deleteTokenDb, //OK
    findUserByToken, //A vérifier
    findCredentialsByUser,  //A vérifier
    addModelInStock, //OK
    updateRank, //OK
    getModelStockById, //OK
    deleteModelStock, //OK
    getModelStockInfoById, //OK
    updateAvatar,
}