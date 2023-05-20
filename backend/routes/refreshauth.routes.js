const { refreshToken } = require('../controllers/auth.controller');

const router=require('express').Router();

router.get('/',refreshToken);

module.exports=router;