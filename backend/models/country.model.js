const Country = require('../classes/Country.class');
const { dbquery } = require('../utils/dbutils');

const findAll = async () => {
    const dbResult = await dbquery('get', 'SELECT * FROM country ORDER BY name');
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new Country(element.id, element.name);
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

const findOne = async (id) => {
    const dbResult = await dbquery('get', 'SELECT * FROM country WHERE id=?', [id]);
    if (dbResult !== -1) {
        if (dbResult.length > 0) {
            const country = new Country(dbResult[0].id, dbResult[0].name)
            return country;
        }
        else
            return false;
    }
    else
        return -1;
}

const addOne = async (country) => {
    const dbResult = await dbquery('add', 'INSERT INTO country (name) VALUES(?)', [country.name]);
    if (dbResult != -1) {
        country.setId(dbResult);
        return country;
    }
    else {
        return undefined;
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

