const Period=require('../classes/Country.class');
const { dbquery } = require('../utils/dbutils');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT * FROM period ORDER BY name');
    if(dbResult.error===0){
        const resultArray=dbResult.result;
        const resultat = resultArray.map(element => {
            const item = new Period(element.id, element.name);
            return item;
        });
        return resultat;
    }
    else
    {
        return dbResult.result;
    }
}

const findOne=async(id)=>{
    const dbResult = await dbquery('get', 'SELECT * FROM period WHERE id=?', [id]);
    if (dbResult.error===0) {
        const resultArray=dbResult.result;
        if (resultArray.length > 0) {
           const  period = new Period(resultArray[0].id, resultArray[0].name)
            return period;
        }
        else
            return{};
    }
    else
        return dbResult.result;
}


const addOne=async(period)=>{
    const dbResult = await dbquery('add', 'INSERT INTO period (name) VALUES(?)', [period.name]);
    if (dbResult.error === 0) {
        period.setId(dbResult.result);
        return period;
    }
    else {
        return dbResult.result;
    }
}

const updateOne=async(period)=>{
    const dbResult = await dbquery('update', 'UPDATE period SET name=? WHERE id=?', [period.name, period.id]);
    return dbResult;
}

const deleteOne=async(id)=>{
    const dbResult = await dbquery('delete', 'DELETE FROM period WHERE id=?', [id]);
    return dbResult;
}

module.exports = {
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne
}
