const State=require('../classes/State.class');
const { dbquery } = require('../utils/dbutils');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT * FROM state ORDER BY name');
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new State(element.id, element.name);
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
    const dbResult = await dbquery('get', 'SELECT * FROM state WHERE id=?', [id]);
    if (dbResult !== -1) {
        if (dbResult.length > 0) {
            const state= new State(dbResult[0].id, dbResult[0].name)
            return state;
        }
        else
            return false;
    }
    else
        return -1;
}

const addOne=async(state)=>{
    const dbResult = await dbquery('add', 'INSERT INTO state (name) VALUES(?)', [state.name]);
    if (dbResult != -1) {
        state.setId(dbResult);
        return state;
    }
    else {
        return undefined;
    }
}

const updateOne=async(state)=>{
    const dbResult = await dbquery('update', 'UPDATE state SET name=? WHERE id=?', [state.name, state.id]);
    return dbResult;
}

const deleteOne=async(id)=>{
    const dbResult = await dbquery('delete', 'DELETE FROM state WHERE id=?', [id]);
    return dbResult;
}

module.exports={
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne,
}