const friendsModel = require('../models/friend.model');
const { friendState } = require('../utils/common');

const isFriend = async (req, res, next) => {
    if (isNaN(req.params.id))
        return res.sendStatus(422);
    const idFriend = parseInt(req.params.id);
    const result = await friendsModel.isFriend(req.user.user_id, idFriend);
    if (result.error === 0) {
        if (result.result.length !== 0) {
            const infos = result.result[0];
            if (infos.is_ok === friendState.friend) {
                req.friendId = idFriend;
                return next();
            }

        }
        return res.sendStatus(403);
    }
    return res.sendStatus(500);
}


module.exports = {
    isFriend,
}