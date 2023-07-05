const friendsModel=require('../models/friend.model');

const getAllVisible = async (req, res) => {
    const idUser=req.user.user_id;
    const result = await friendsModel.findVisible(idUser);
    if (typeof result === 'object'){
        //Get friend list
        friendsList=await friendsModel.getFriendList(idUser);
        console.log(friendsList);
        if(friendsList.error===0){
            const listCompleted=result.map((user)=>{
                const isFriend=friendsList.result.find((item)=>
                    item.id_friend1===user.id || item.id_friend2===user.id
                )
                console.log('trouvé :',user.id, isFriend);
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

module.exports={
    getAllVisible,

}