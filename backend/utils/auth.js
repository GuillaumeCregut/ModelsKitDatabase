require('dotenv').config({path:'../.env'});
const {logWarning}=require('./logEvent');
const jwt = require('jsonwebtoken');

const privateKey=process.env.PRIVATE_KEY;
const refreshKey=process.env.REFRESH_TOKEN;
const maxAge = 1000 * 60 * 60 //1 hour
const  maxAgeRefresh=3*1000*60*60; //Should be longer

const calculatetoken=(id,rank,firstname,lastname,key)=>{
    let keyUsed='';
    let ageToken=0;
    switch(key){
        case 'auth' : keyUsed=privateKey;
                    ageToken=maxAge;
            break;
        case 'refresh' : keyUsed=refreshKey;
                    ageToken=maxAgeRefresh;
            break;
        default: keyUsed='';

    }
    const jwtoken= jwt.sign({user_id:id, rank: rank, firstname,lastname},keyUsed,{expiresIn:ageToken});
    return jwtoken;
}

const verifyToken=(token,typeToken)=>{
    let key=undefined;
    switch(typeToken){
        case 'access': key=privateKey;
                break;
        case 'refresh': key=refreshKey;
                break;
        default : key=undefined;
    }
    if(!key){
        logWarning(`Auth : Erreur de validation de clé`);
        console.error('Erreur de validation de clé');
    }
    return jwt.verify(token,key,(err,decoded)=>{
        if(err) {
            return false; 
        }
        return decoded;
    })
}

module.exports={
    calculatetoken,
    maxAgeRefresh,
    verifyToken
}