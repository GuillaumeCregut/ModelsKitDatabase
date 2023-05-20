const bcrypt=require('bcrypt');
//Initialisation values
const saltRounds=10;

/**
 * 
 * Function to encrypt password with bcrypt
 * 
 * @param {*} password 
 * @returns encrypted password
 */
const encrypt=(password)=>{
  return  bcrypt
    .hash(password,saltRounds)
    .then((hash)=>hash)
}


/**
 * 
 * Function compare hashed password from database with supplied password
 * 
 * 
 * @param {*} password 
 * @param {*} hashedPassword 
 * @returns true if match, false else.
 */
const compare=(password, hashedPassword)=>{
    return bcrypt
                .compare(password,hashedPassword)
                .then((result)=>result)
}

module.exports={
    encrypt,
    compare
}