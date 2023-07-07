const router =require('express').Router();
const {isFriend}=require('../middlewares/friendsMiddleware');
const friendsController=require('../controllers/friends.controller');
const {userCheck,checkLevel}=require('../middlewares/UserValidation');

router.get('/visible',userCheck,friendsController.getAllVisible);
router.delete('/unlink/:id',userCheck,isFriend,friendsController.unlinkUser);
module.exports=router;