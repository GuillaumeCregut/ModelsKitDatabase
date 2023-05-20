const { logWarning } =require('../utils/logEvent');

const logger=async(req,res,next)=>{
    const ip=req.socket.remoteAddress;
    await logWarning(`l'adresse IP ${ip} a tenter de se connecter à une mauvaise route avec la méthode ${req.method}`);
    next();
}

const loggerDebug=async (req,res,next)=>{
    await logWarning(`En-tête requete ${req.headers.origin}, URL=${req.url}`)
    next();
}

module.exports={
logger,
loggerDebug
};
