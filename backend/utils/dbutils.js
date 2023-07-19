const connection=require('../dbconfig');
const db=connection.promise();

const {logError}=require('./logEvent');
/**
 * 
 * @param {*} action add,update, get,delete
 * @param {*} sql sql query
 * @param {*} params array of parameters
 * @returns objet {error : 0 no error, 1:sql error, 2, fatal error; result: 
 * case add : lastInsertId, get : result, update/delete : true/false, error : sql error}
 */
const dbquery = (action,sql,params)=>{
    return db.query(sql,params)
        .then(([result])=>{
            switch(action){
                case 'add' : return {error: 0,result:result.insertId};
                        break;
                case "update" : return {error: 0,result:result.affectedRows!==0};
                        break;
                case "get" : return {error: 0,result:result};
                        break;
                case "delete":  return {error: 0,result:result.affectedRows!==0};
                        break;
                default :

            }
    }) 
    .catch(async(err)=>{
        await logError(`dbutils : ${err}`);
        console.error(err);
        return {error:1,result:err?.errno};
    })
}


module.exports={
    dbquery
}