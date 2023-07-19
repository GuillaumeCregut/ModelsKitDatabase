const router =require('express').Router();
const {isFriend}=require('../middlewares/friendsMiddleware');
const friendsController=require('../controllers/friends.controller');
const {userCheck,checkLevel}=require('../middlewares/UserValidation');

router.get('/',userCheck,friendsController.getFriends);
router.get('/visible',userCheck,friendsController.getAllVisible);
router.get('/demands',userCheck,friendsController.getDemand);
router.get('/:id/models',userCheck,isFriend, friendsController.getFriendModels);
router.get('/:id/models/:idModel',userCheck,isFriend, friendsController.getFriendModelDetails);
router.post('/demands',userCheck,friendsController.addFriendShip);
router.put('/demands',userCheck,friendsController.changeDemand);
router.delete('/unlink/:id',userCheck,isFriend,friendsController.unlinkUser);
module.exports=router;