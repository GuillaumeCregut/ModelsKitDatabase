const Supplier = require('../classes/Supplier.class');
const { dbquery } = require('../utils/dbutils');

const findAll = async () => {
    const dbResult = await dbquery('get', 'SELECT * FROM provider ORDER BY owner,name');
    if (dbResult.error === 0) {
        const resultat = dbResult.result.map(element => {
            const item = new Supplier(element.id, element.name, element.owner);
            return item;
        });
        return resultat;
    }
    else
        return dbResult.result;
}

const findOne = async (id) => {
    const dbResult = await dbquery('get', 'SELECT * FROM provider WHERE id=?', id);
    if (dbResult.error === 0) {
        if (dbResult.result.length === 0)
            return [];
        const item = dbResult.result[0];
        const supplier = new Supplier(item.id, item.name, item.owner)
        return supplier;
    }
    else
        return dbResult.result;
}

const findAllUser = async (idUser) => {
    const dbResult = await dbquery('get', 'SELECT * FROM provider WHERE owner=? ORDER BY name', [idUser]);
    if (dbResult.error === 0) {
        const resultat = dbResult.result.map(element => {
            const item = new Supplier(element.id, element.name, element.owner);
            return item;
        });
        return resultat;
    }
    else
        return dbResult.result;
}

const findOneUser = async (idUser, idSupplier) => {
    const dbResult = await dbquery('get', 'SELECT * FROM provider WHERE id=? AND owner=?', [idSupplier, idUser]);
    if (dbResult.error===0) {
        if (dbResult.result.length > 0) {
            const item = dbResult.result[0];
            const supplier = new Supplier(item.id, item.name, item.owner)
            return supplier;
        }
        else return []
    }
    else
        return dbResult.result;
}

const addOne = async (supplier) => {
    const dbResult = await dbquery('add', 'INSERT INTO provider (name,owner) VALUES(?,?)', [supplier.name, supplier.owner]);
    if (dbResult.error===0) {
        supplier.setId(dbResult.result);
        return supplier;
    }
    else {
        return dbResult.result;
    }
}

const updateOne = async (supplier) => {
    const dbResult = await dbquery('update', 'UPDATE provider SET name=?, owner=? WHERE id=?', [supplier.name, supplier.owner, supplier.id]);
    return dbResult;
}

const deleteOne = async (id) => {
    const dbResult = await dbquery('delete', 'DELETE FROM provider WHERE id=?', [id]);
    return dbResult;
}

module.exports = {
    findAll,
    findAllUser,
    findOne,
    findOneUser,
    addOne,
    updateOne,
    deleteOne,
}