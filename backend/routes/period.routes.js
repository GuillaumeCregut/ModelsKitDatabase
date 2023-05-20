const router=require('express').Router();
const {userCheck,checkLevel}=require('../middlewares/UserValidation');
const periodController=require('../controllers/period.controller');

router.get('/',periodController.getAll);
router.get('/:id',periodController.getOne);
router.post('/',userCheck,periodController.addOne);
router.put('/:id',userCheck,checkLevel,periodController.updateOne);
router.delete('/:id',userCheck,checkLevel,periodController.deleteOne)

module.exports=router;
