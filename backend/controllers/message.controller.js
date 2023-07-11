const messageModel=require('../models/message.model');
const userModel=require('../models/users.model');
const Joi=require('joi');

const validate = (data) => {
    const presence ='required';
    return Joi.object({
        dest: Joi.number().integer().presence(presence),
        message: Joi.string().presence(presence),
    }).validate(data, { abortEarly: false }).error;
}

const getMessages=async(req, res)=>{
    const idFriend=req.params.id;
    if(!idFriend)
        return res.sendStatus(422);
    const friendRequest=await userModel.findOne(idFriend);
     if(typeof friendRequest !=='object')
         return res.sendStatus(500);
    const dest=req.user.user_id;
    const messages=await messageModel.getMessages(idFriend,dest);
    if(messages.error===0){
        //Set messages to red
        //Make data
        const friend=friendRequest[0];
        const data={
            id:friend.id,
            firstname:friend.firstname,
            lastname:friend.lastname,
            avatar:friend.avatar,
            messages: messages.result
        }
        return res.json(data);
    }   
    return res.sendStatus(500);
    
}

const addPrivateMessage=async(req,res)=>{
    const exp=req.user.user_id;
    const errors=validate(req.body);
    if(errors){
        return res.sendStatus(422);
    }
    const {message,dest}=req.body;
    const addMessage=await messageModel.addMessagePrivate(exp,dest,message);
    if(addMessage.error===0){
        return res.sendStatus(201);
    }
    return res.sendStatus(500);
}

module.exports={
    getMessages,
    addPrivateMessage,
}