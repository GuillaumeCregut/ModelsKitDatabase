const { dbquery } = require('../utils/dbutils');
const Brand=require('../classes/Brand.class');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT * FROM brand ORDER BY name');
    if(dbResult.error===0){
        const resultArray=dbResult.result;
        const resultat = resultArray.map(element => {
            const item = new Brand(element.id, element.name);
            return item;
        });
        return resultat;
    }
    else
    {
        return dbResult.error;
    }

}

const findOne=async(id)=>{
    const dbResult = await dbquery('get', 'SELECT * FROM brand WHERE id=?', [id]);
    if (dbResult.error===0) {
        const resultArray=dbResult.result;
        if (resultArray.length > 0) {
            const brand = new Brand(resultArray[0].id, resultArray[0].name)
            return brand;
        }
        else
            return{};
    }
    else
        return dbResult.error;
}

const addOne=async(brand)=>{
    const dbResult = await dbquery('add', 'INSERT INTO brand (name) VALUES(?)', [brand.name]);
    if (dbResult.error === 0) {
       brand.setId(dbResult.result);
        return brand;
    }
    else {
        return dbResult.error;
    }
}

const updateOne=async(brand)=>{
    const dbResult = await dbquery('update', 'UPDATE brand SET name=? WHERE id=?', [brand.name, brand.id]);
    return dbResult;
}

const deleteOne=async(id)=>{
    const dbResult = await dbquery('delete', 'DELETE FROM brand WHERE id=?', [id]);
    return dbResult;
}

module.exports = {
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne
}