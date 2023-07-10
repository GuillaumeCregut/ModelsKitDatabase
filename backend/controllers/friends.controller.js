const friendsModel = require('../models/friend.model');
const { friendState } = require('../utils/common');
const Joi = require('joi');

const validate = (data) => {
    return Joi.object({
        statusFriend: Joi.number().integer().presence('required'),
        friendId: Joi.number().integer().presence('required'),
    }).validate(data, { abortEarly: false }).error;
}

const getAllVisible = async (req, res) => {
    const idUser = req.user.user_id;
    const result = await friendsModel.findVisible(idUser);
    if (typeof result === 'object') {
        //Get friend list
        friendsList = await friendsModel.getFriendList(idUser);
        if (friendsList.error === 0) {
            const listCompleted = result.map((user) => {
                const isFriend = friendsList.result.find((item) =>
                    item.id_friend1 === user.id || item.id_friend2 === user.id
                )
                if (isFriend)
                    return { ...user, is_ok: isFriend.is_ok }
                else
                    return { ...user, is_ok: 0 };
            })
            res.json(listCompleted);
        }
        else
            return res.sendStatus(500);
    }
    else {
        res.sendStatus(500)
    }
}

const unlinkUser = async (req, res) => {
    console.log(req.friendId, req.user.user_id)
    //Remove link between users
    res.sendStatus(200);
}

const getDemand = async (req, res) => {
    const demandResult = await friendsModel.getUserStatusWithMe(req.user.user_id, friendState.waiting);
    if (demandResult.error === 0) {
        return res.json(demandResult.result);
    }
    else
        return res.sendStatus(500);
}

const changeDemand = async (req, res) => {
    const errors = validate(req.body);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const { statusFriend, friendId } = req.body;
    const idUser = req.user.user_id;
    if (!(Object.values(friendState).indexOf(statusFriend) > -1)) {
        return res.sendStatus(422);
    }
    const upateResult=await friendsModel.updateFriendship(idUser,friendId,statusFriend);
    if(upateResult.error===0){
        if(upateResult.result)
            return  res.sendStatus(204);
        return res.sendStatus(404);
    }
    return res.sendStatus(500);
}

const addFriendShip=async(req,res)=>{
    const {friendId}=req.body;
    if(!friendId)
        return res.sendStatus(422);
    
    const addRelation=await friendsModel.addFriendShip( req.user.user_id,friendId,friendState.waiting);
    if(addRelation.error===0){
        return res.sendStatus(201);
    }
    switch(addRelation.result){
        case 1062 : return res.sendStatus(409);
        case 1452 : return res.sendStatus(404);
        default : return res.sendStatus(500);
    }

}

module.exports = {
    getAllVisible,
    unlinkUser,
    getDemand,
    changeDemand,
    addFriendShip,
}