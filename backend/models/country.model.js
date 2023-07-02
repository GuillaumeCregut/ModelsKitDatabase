const Country = require('../classes/Country.class');
const { dbquery } = require('../utils/dbutils');

const findAll = async () => {
    const dbResult = await dbquery('get', 'SELECT * FROM country ORDER BY name');
    if (dbResult.error === 0) {
        const resultArray = dbResult.result;
        const resultat = resultArray.map(element => {
            const item = new Country(element.id, element.name);
            return item;
        });
        return resultat;
    }
    else {
        return dbResult.error;
    }

}

const findOne = async (id) => {
    const dbResult = await dbquery('get', 'SELECT * FROM country WHERE id=?', [id]);
    if (dbResult.error === 0) {
        const resultArray = dbResult.result;
        if (resultArray.length > 0) {
            const country = new Country(resultArray[0].id, resultArray[0].name)
            return country;
        }
        else
            return {};
    }
    else
        return dbResult.error;
}

const addOne = async (country) => {
    const dbResult = await dbquery('add', 'INSERT INTO country (name) VALUES(?)', [country.name]);
    if (dbResult.error === 0) {
        country.setId(dbResult.result);
        return country;
    }
    else {
        return dbResult.error;
    }
}

const updateOne = async (country) => {
    const dbResult = await dbquery('update', 'UPDATE country SET name=? WHERE id=?', [country.name, country.id]);
    return dbResult;
}

const deleteOne = async (id) => {
    const dbResult = await dbquery('delete', 'DELETE FROM country WHERE id=?', [id]);
    return dbResult;
}

module.exports = {
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne
}

