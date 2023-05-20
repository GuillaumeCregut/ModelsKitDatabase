const router=require('express').Router();
const {deleteToken}=require('../controllers/auth.controller');

router.get('/',deleteToken);

module.exports=router;