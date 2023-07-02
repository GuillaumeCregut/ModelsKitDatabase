const State=require('../classes/State.class');
const { dbquery } = require('../utils/dbutils');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT * FROM state ORDER BY name');
    if(dbResult.error===0){
        const resultArray=dbResult.result;
        const resultat = resultArray.map(element => {
            const item = new State(element.id, element.name);
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
    const dbResult = await dbquery('get', 'SELECT * FROM state WHERE id=?', [id]);
    if (dbResult.error===0) {
        const resultArray=dbResult.result;
        if (resultArray.length > 0) {
            const state= new State(resultArray[0].id, resultArray[0].name)
            return state;
        }
        else
            return{};
    }
    else
        return dbResult.error;
}

const addOne=async(state)=>{
    const dbResult = await dbquery('add', 'INSERT INTO state (name) VALUES(?)', [state.name]);
    if (dbResult.error === 0) {
        state.setId(dbResult.result);
        return state;
    }
    else {
        return dbResult.error;
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