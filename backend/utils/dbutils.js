const connection=require('../dbconfig');
const db=connection.promise();

const {logError}=require('./logEvent');
const dbquery = (action,sql,params)=>{
    return db.query(sql,params)
        .then(([result])=>{
            switch(action){
                case 'add' : return result.insertId;
                        break;
                case "update" : return result.affectedRows!==0
                        break;
                case "get" : return result;
                        break;
                case "delete":  return result.affectedRows!==0
                        break;
                default :

            }
    }) 
    .catch(async(err)=>{
        await logError(`dbutils : ${err}`);
        console.error(err);
        return -1;
    })
}


module.exports={
    dbquery
}