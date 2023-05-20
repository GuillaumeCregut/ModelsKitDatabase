const {  logError } =require('../utils/logEvent');

const errorHandler=(err,req,res,next)=>{
    logError(err.message);
    res.status(500).send(err.message);
}

const errorFileHandler = (error, req, res, next) => {
    if (error) {
        console.error(error);
        logError(`errorHandler.file : ${error}.message`);
        const filePath = { path: null };
        req.file = filePath;
    }
    next();
}


module.exports={
    errorHandler,
    errorFileHandler
};