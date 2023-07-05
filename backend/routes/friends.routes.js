const router =require('express').Router();
const friendsController=require('../controllers/friends.controller');
const {userCheck,checkLevel}=require('../middlewares/UserValidation');

router.get('/visible',userCheck,friendsController.getAllVisible);

module.exports=router;