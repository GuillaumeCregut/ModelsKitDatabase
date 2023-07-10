const { dbquery } = require('../utils/dbutils');

const getMessages=async(id1, id2)=>{
    const dbResult=dbquery('get','SELECT * FROM `private_message` WHERE (exp=? and dest=?) OR (exp=? and dest=?) ORDER BY date_m DESC;',[id1,id2,id2,id1]);
    return dbResult;
}

const setRead=async(exp,dest)=>{
    const dbResult=dbquery('update','UPDATE private_message SET is_read=1 WHERE (dest=? and exp=?)',[dest,exp]);
    return dbResult;
}

module.exports={
    getMessages,
    setRead,
}