const router=require('express').Router();
const supplierController=require('../controllers/supplier.controller');
const {userCheck}=require('../middlewares/UserValidation');

//toutes les routes sont à protéger
router.get('/',userCheck,supplierController.getAll);
router.get('/user/:id',userCheck,supplierController.getUser)
router.get('/:id',userCheck,supplierController.getOne)
router.post('/',userCheck,supplierController.addOne);
router.put('/:id',userCheck,supplierController.updateOne);
router.delete('/:id',userCheck,supplierController.deleteOne);

module.exports=router;