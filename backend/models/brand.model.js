const { dbquery } = require('../utils/dbutils');
const Brand=require('../classes/Brand.class');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT * FROM brand ORDER BY name');
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new Brand(element.id, element.name);
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
    const dbResult = await dbquery('get', 'SELECT * FROM brand WHERE id=?', [id]);
    if (dbResult !== -1) {
        if (dbResult.length > 0) {
            const brand = new Brand(dbResult[0].id, dbResult[0].name)
            return brand;
        }
        else
            return false;
    }
    else
        return -1;
}

const addOne=async(brand)=>{
    const dbResult = await dbquery('add', 'INSERT INTO brand (name) VALUES(?)', [brand.name]);
    if (dbResult != -1) {
       brand.setId(dbResult);
        return brand;
    }
    else {
        return undefined;
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