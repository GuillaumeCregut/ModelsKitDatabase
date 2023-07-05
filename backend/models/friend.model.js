const { dbquery } = require('../utils/dbutils');

const findVisible = async (id) => {
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,avatar FROM user WHERE isVisible=true and id!=?',[id]);
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

const getFriendList=async(id)=>{
    const dbResult=await dbquery('get','SELECT * FROM `friend` WHERE id_friend1=? or id_friend2=?', [id,id])
    return dbResult;
}
//SELECT * FROM `friend` WHERE id_friend1=5 or id_friend2=5;


module.exports={
    findVisible,
    getFriendList,

}