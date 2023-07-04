const router=require('express').Router();
const {userCheck,checkLevel}=require('../middlewares/UserValidation');
const usersController=require('../controllers/users.controller');
const {createSubUpload}=require('../utils/fs');

createSubUpload('users');

router.get('/',userCheck,checkLevel,usersController.getAll);
router.get('/visible', userCheck,usersController.getAllVisible);
router.get('/:id',userCheck,usersController.getOne);
router.post('/',usersController.addOne);
router.post('/model',userCheck,usersController.addModelStock);
router.patch('/admin/:id',userCheck,checkLevel,usersController.updateRank);
router.put('/:id',userCheck,usersController.updateUser);
router.delete('/model/:id',userCheck,usersController.deleteModel);
router.delete('/:id',userCheck,usersController.deleteUser);

module.exports=router;