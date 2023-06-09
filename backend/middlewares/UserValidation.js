const { verifyToken } = require('../utils/auth');
const { logError } = require('../utils/logEvent');
const { userRole } = require('../utils/common');

const getidFromToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1];
            const isOK = verifyToken(token, 'access');
            if (!isOK)
                return res.sendStatus(403);
            req.user = isOK;
        }
        catch (err) {
            logError(`UserValidation : ${err}`);
            console.error(err);
            return res.sendStatus(500);
        }
    }
    else req.user={user_id:0}
    next();
}

const userCheck = (req, res, next) => {
    // For later.
    // const authHeader=req.headers['authorization'];
    // to be relaced by
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    try {
        const token = authHeader.split(' ')[1];
        const isOK = verifyToken(token, 'access');
        if (!isOK)
            return res.sendStatus(403);
        req.user = isOK;
        next();
    }
    catch (err) {
        logError(`UserValidation : ${err}`);
        console.error(err);
        return res.sendStatus(500);
    }
}

const checkLevel = (req, res, next) => {
    const rankUser = req.user.rank;
    if (rankUser !== userRole.admin)
        return res.sendStatus(403);
    next();
}

const idChecker = (req, res, next) => {
    if (isNaN(req.params.id))
        return res.sendStatus(422);
    next();
}

module.exports = {
    userCheck,
    checkLevel,
    idChecker,
    getidFromToken
}