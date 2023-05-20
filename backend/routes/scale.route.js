const router=require('express').Router();
const scaleController=require('../controllers/scale.controller');
const {userCheck,checkLevel}=require('../middlewares/UserValidation');

router.get('/',scaleController.getAll);
router.get('/:id',scaleController.getOne);
router.post('/',userCheck,scaleController.addOne);
router.put('/:id',userCheck,checkLevel,scaleController.updateOne);
router.delete('/:id',userCheck,checkLevel,scaleController.deleteOne);

module.exports=router;