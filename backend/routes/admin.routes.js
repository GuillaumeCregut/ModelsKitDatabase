const router=require('express').Router();
const adminController=require('../controllers/admin.controller');

router.get('/',(req,res)=>{
    res.sendStatus(418);
})

router.get('/logs/:id',adminController.getWarnings);

module.exports=router;