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

const getUserStatusWithMe=async(id,status)=>{
    const dbResult=await dbquery('get','SELECT f.id_friend1 as id,u.firstname, u.lastname, u.avatar FROM friend f INNER JOIN user u ON f.id_friend1=u.id WHERE is_ok=? AND id_friend2=?;',[status,id]);
    return dbResult;
}

const updateFriendship=async(id1,id2,newStatus)=>{
    const dbResult=await dbquery('update','UPDATE friend SET is_ok=? WHERE (id_friend1=? AND id_friend2=?) OR (id_friend1=? AND id_friend2=?)',[newStatus, id1, id2,id2,id1]);
    return dbResult;
}   

const addFriendShip=async(idUser,idFriend,status)=>{
    const dbResult=await dbquery('add','INSERT INTO friend (id_friend1,id_friend2,is_ok) VALUES(?,?,?)',[idUser,idFriend,status]);
    return dbResult;
}

const getFriends=async(id,status)=>{
    const dbResult=await dbquery('get','SELECT u.firstname, u.lastname,u.avatar, u.id FROM user u INNER JOIN (SELECT `id_friend1` as friendId FROM `friend` WHERE id_friend2=? and is_ok=? UNION SELECT `id_friend2` FROM `friend` WHERE id_friend1=? and is_ok=?) as friends ON u.id=friends.friendId;',[id,status,id,status]);
    return dbResult;
}

module.exports={
    findVisible,
    getFriendList,
    isFriend,
    getUserStatusWithMe,
    updateFriendship,
    addFriendShip,
    getFriends,
}