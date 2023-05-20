const Scale=require('../classes/Scale.class');
const { dbquery } = require('../utils/dbutils');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT * FROM scale');
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new Scale(element.id, element.name);
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
    const dbResult = await dbquery('get', 'SELECT * FROM scale WHERE id=?', [id]);
    if (dbResult !== -1) {
        if (dbResult.length > 0) {
            const scale= new Scale(dbResult[0].id, dbResult[0].name)
            return scale;
        }
        else
            return false;
    }
    else
        return -1;
}

const addOne=async(scale)=>{
    const dbResult = await dbquery('add', 'INSERT INTO scale (name) VALUES(?)', [scale.name]);
    if (dbResult != -1) {
        scale.setId(dbResult);
        return scale;
    }
    else {
        return undefined;
    }
}

const updateOne=async(scale)=>{
    const dbResult = await dbquery('update', 'UPDATE scale SET name=? WHERE id=?', [scale.name, scale.id]);
    return dbResult;
}

const deleteOne=async(id)=>{
    const dbResult = await dbquery('delete', 'DELETE FROM scale WHERE id=?', [id]);
    return dbResult;
}

module.exports={
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne,
}