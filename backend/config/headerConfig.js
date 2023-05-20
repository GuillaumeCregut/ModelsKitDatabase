const headerConfig=(req,res,next)=>{
    res.setHeader('Access-Controll-Allow-Origin','*');
    res.setHeader('Access-Controll-Allow-Headers','Origin,X-Requested-With,Content,Accept,Content-Type,Authorization');
    res.setHeader('Access-Controll-Allow-Methods','GET,POST,PUT,DELETE'),
    next();
}

module.exports=headerConfig;