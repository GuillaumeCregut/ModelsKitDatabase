const router=require('express').Router();
const {logger}=require('../middlewares/loggerMiddleware');
const {userCheck,checkLevel}=require('../middlewares/UserValidation');
//routes requirements
const admin=require('./admin.routes');
const auth=require('./auth.routes');
const logout=require('./logout.routes');
const refresAuth=require('./refreshauth.routes');
const brand=require('./brand.routes');
const builder=require('./builder.route');
const category=require('./category.route');
const country=require('./country.routes');
const model=require('./model.route');
const order=require('./order.route');
const period=require('./period.routes');
const scale=require('./scale.route');
const state=require('./state.route');
const stats=require('./stats.route');
const supplier=require('./supplier.route');
const users=require('./users.routes');

/*Specific routes*/
router.use('/auth',auth);
router.use('/logout',logout);
router.use('/refresh',refresAuth);

/* Routes*/
router.use('/admin',userCheck,checkLevel,admin);
router.use('/brand',brand);
router.use('/builder',builder);
router.use('/country',country);
router.use('/category',category);
router.use('/model',model);
router.use('/order',order);
router.use('/period',period);
router.use('/scale',scale);
router.use('/state',state);
router.use('/stats',stats);
router.use('/supplier',supplier);
router.use('/users',users);

/* Default routes */
const defaultReply=(req,res)=>{
    res.status(404);
    res.send('Please read documentation')
}

router.get('/',logger,defaultReply);
router.get('/:id',logger,defaultReply);
router.post('/',logger,defaultReply);
router.put('/:id',logger,defaultReply);
router.delete('/:id',logger,defaultReply);

module.exports=router;