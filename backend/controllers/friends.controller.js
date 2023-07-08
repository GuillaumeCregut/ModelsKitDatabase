const friendsModel=require('../models/friend.model');
const {friendState}=require('../utils/common');

const getAllVisible = async (req, res) => {
    const idUser=req.user.user_id;
    const result = await friendsModel.findVisible(idUser);
    if (typeof result === 'object'){
        //Get friend list
        friendsList=await friendsModel.getFriendList(idUser);
        if(friendsList.error===0){
            const listCompleted=result.map((user)=>{
                const isFriend=friendsList.result.find((item)=>
                    item.id_friend1===user.id || item.id_friend2===user.id
                )
                if(isFriend)
                    return {...user, is_ok:isFriend.is_ok}
                else
                    return {...user, is_ok:0};
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

const unlinkUser=async(req,res)=>{
    console.log(req.friendId,req.user.user_id)
    //Remove link between users
    res.sendStatus(200);
}

const getDemand=async(req,res)=>{
    const demandResult=await friendsModel.getUserStatusWithMe(req.user.user_id,friendState.waiting);
    if(demandResult.error===0){
        return res.json(demandResult.result);
    }
    else
        return res.sendStatus(500);
}

module.exports={
    getAllVisible,
    unlinkUser,
    getDemand,
}