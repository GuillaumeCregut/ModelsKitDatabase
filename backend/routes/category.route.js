const router=require('express').Router();
const {userCheck,checkLevel}=require('../middlewares/UserValidation');
const categoryController=require('../controllers/category.controller');

router.get('/',categoryController.getAll);
router.get('/:id',categoryController.getOne);
router.post('/',userCheck,categoryController.addOne);
router.put('/:id',userCheck,checkLevel,categoryController.updateOne);
router.delete('/:id',userCheck,checkLevel,categoryController.deleteOne);

module.exports=router;