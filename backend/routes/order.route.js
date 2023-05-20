const router=require('express').Router();
const orderController=require('../controllers/order.controller');
const {userCheck,checkLevel}=require('../middlewares/UserValidation');

//All routes have to be controlled
router.get('/',userCheck,checkLevel,orderController.getAll);
router.get('/user/:id',userCheck,orderController.getAllUser);
router.get('/:id',userCheck,orderController.getOne);
router.post('/',userCheck,orderController.addOne);
router.put('/:id',userCheck,orderController.updateOne);
router.delete('/:id',userCheck,orderController.deleteOne);

module.exports=router;