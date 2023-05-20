const router=require('express').Router();
const {authCheck,reloadUser}=require('../controllers/auth.controller')
router.get('/',(req,res)=>{
    res.sendStatus(404);
})

router.post('/',authCheck);
router.post('/reload/',reloadUser);
router.put('/',(req,res)=>{
    res.sendStatus(404);
});


router.delete('/',(req,res)=>{
    res.sendStatus(404);
})
module.exports=router;