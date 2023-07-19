const router =require('express').Router();
const messageController=require('../controllers/message.controller');
const {userCheck,checkLevel}=require('../middlewares/UserValidation');
const {isFriend}=require('../middlewares/friendsMiddleware');

router.get('/private/:id',userCheck,isFriend,messageController.getMessages);
router.post('/private/:id',userCheck,isFriend,messageController.addPrivateMessage);
router.post('/models/:id',userCheck,isFriend, messageController.postMessage);
module.exports=router;