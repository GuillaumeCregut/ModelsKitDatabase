const Scale=require('../classes/Scale.class');
const { dbquery } = require('../utils/dbutils');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT * FROM scale');
    if(dbResult.error===0){
        const resultArray=dbResult.result;
        const resultat = resultArray.map(element => {
            const item = new Scale(element.id, element.name);
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
    const dbResult = await dbquery('get', 'SELECT * FROM scale WHERE id=?', [id]);
    if (dbResult.error===0) {
        const resultArray=dbResult.result;
        if (resultArray.length > 0) {
            const scale= new Scale(resultArray[0].id, resultArray[0].name)
            return scale;
        }
        else
            return{};
    }
    else
        return dbResult.result;
}

const addOne=async(scale)=>{
    const dbResult = await dbquery('add', 'INSERT INTO scale (name) VALUES(?)', [scale.name]);
    if (dbResult.error === 0) {
        scale.setId(dbResult.result);
        return scale;
    }
    else {
        return dbResult.result;
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