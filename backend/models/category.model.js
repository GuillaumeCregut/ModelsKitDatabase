const Category = require('../classes/Category.class');
const { dbquery } = require('../utils/dbutils');

const findAll = async () => {
    const dbResult = await dbquery('get', 'SELECT * FROM category ORDER BY name');
    if (dbResult.error === 0) {
        const resultArray = dbResult.result;
        const resultat = resultArray.map(element => {
            const item = new Category(element.id, element.name);
            return item;
        });
        return resultat;
    }
    else {
        return dbResult.error;
    }
}

const findOne = async (id) => {
    const dbResult = await dbquery('get', 'SELECT * FROM category WHERE id=?', [id]);
    if (dbResult.error === 0) {
        const resultArray = dbResult.result;
        if (resultArray.length > 0) {
            const category = new Category(resultArray[0].id, resultArray[0].name)
            return category;
        }
        else
            return {};
    }
    else
        dbResult.error;
}

const addOne = async (category) => {
    const dbResult = await dbquery('add', 'INSERT INTO category (name) VALUES(?)', [category.name]);
    if (dbResult.error === 0) {
        category.setId(dbResult.result);
        return category;
    }
    else {
        return dbResult.result;
    }
}

const updateOne = async (category) => {
    const dbResult = await dbquery('update', 'UPDATE category SET name=? WHERE id=?', [category.name, category.id]);
    return dbResult;
}

const deleteOne = async (id) => {
    const dbResult = await dbquery('delete', 'DELETE FROM category WHERE id=?', [id]);
    return dbResult;
}

module.exports = {
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne,
}