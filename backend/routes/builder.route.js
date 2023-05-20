const router=require('express').Router();
const builderController=require('../controllers/builder.controller');
const {userCheck,checkLevel}=require('../middlewares/UserValidation');

router.get('/',builderController.getAll);
router.get('/:id',builderController.getOne);
router.post('/',userCheck,builderController.addOne);
router.put('/:id',userCheck,checkLevel,builderController.updateOne);
router.delete('/:id',userCheck,checkLevel,builderController.deleteOne);

module.exports =router;