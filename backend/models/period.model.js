const Period=require('../classes/Country.class');
const { dbquery } = require('../utils/dbutils');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT * FROM period ORDER BY name');
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new Period(element.id, element.name);
            return item;
        });
        return resultat;
    }
    else if(dbResult===-1)
    {
        return undefined;
    }
    else
        return -1;
}

const findOne=async(id)=>{
    const dbResult = await dbquery('get', 'SELECT * FROM period WHERE id=?', [id]);
    if (dbResult !== -1) {
        if (dbResult.length > 0) {
           const  period = new Period(dbResult[0].id, dbResult[0].name)
            return period[0];
        }
        else
            return false;
    }
    else
        return -1;
}


const addOne=async(period)=>{
    const dbResult = await dbquery('add', 'INSERT INTO period (name) VALUES(?)', [period.name]);
    if (dbResult != -1) {
        period.setId(dbResult);
        return period;
    }
    else {
        return undefined;
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
