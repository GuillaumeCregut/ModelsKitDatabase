const { dbquery } = require('../utils/dbutils');

const findVisible = async (id) => {
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,avatar FROM user WHERE isVisible=true and id!=?',[id]);
    if (dbResult.error === 0) {
        const resultat = dbResult.result.map(element => {
            const item ={firstname:element.firstname, lastname:element.lastname,avatar:element.avatar ,id:element.id};
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

const isFriend=async(id1, id2)=>{
    const dbResult=await dbquery('get','SELECT * FROM friend WHERE ((id_friend1=? AND id_friend2=?) OR (id_friend1=? AND id_friend2=?))',[id1,id2,id2,id1])
    return dbResult;
}



module.exports={
    findVisible,
    getFriendList,
    isFriend,
}