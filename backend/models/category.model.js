const Category=require('../classes/Category.class');
const { dbquery } = require('../utils/dbutils');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT * FROM category ORDER BY name');
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new Category(element.id, element.name);
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
    const dbResult = await dbquery('get', 'SELECT * FROM category WHERE id=?', [id]);
    if (dbResult !== -1) {
        if (dbResult.length > 0) {
            const category= new Category(dbResult[0].id, dbResult[0].name)
            return category;
        }
        else
            return false;
    }
    else
        return -1;
}

const addOne=async(category)=>{
    const dbResult = await dbquery('add', 'INSERT INTO category (name) VALUES(?)', [category.name]);
    if (dbResult != -1) {
        category.setId(dbResult);
        return category;
    }
    else {
        return undefined;
    }
}

const updateOne=async(category)=>{
    const dbResult = await dbquery('update', 'UPDATE category SET name=? WHERE id=?', [category.name, category.id]);
    return dbResult;
}

const deleteOne=async(id)=>{
    const dbResult = await dbquery('delete', 'DELETE FROM category WHERE id=?', [id]);
    return dbResult;
}

module.exports={
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne,
}