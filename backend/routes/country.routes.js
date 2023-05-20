const router=require('express').Router();
const countryController=require('../controllers/country.controller');
const {userCheck,checkLevel}=require('../middlewares/UserValidation');

router.get('/',countryController.getAll);
router.get('/:id',countryController.getOne);
router.post('/',userCheck,countryController.addCountry);
router.put('/:id',userCheck,checkLevel,countryController.updateCountry);
router.delete('/:id',userCheck,checkLevel,countryController.deleteCountry);

module.exports=router;