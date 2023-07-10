const messageModel=require('../models/message.model');
const userModel=require('../models/users.model');

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

module.exports={
    getMessages,
}