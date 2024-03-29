const { dbquery } = require('../utils/dbutils');
const Builder = require('../classes/Builder.class');

const findAll = async () => {
    const dbResult = await dbquery('get', 'SELECT builders.name, builders.id, builders.country, country.name as country_name FROM builders INNER JOIN country on builders.country=country.id ORDER BY builders.name');
    if(dbResult.error===0){
        const resultArray=dbResult.result;
        const resultat = resultArray.map((item) => {
            const builder = new Builder(item.id, item.name, item.country);
            builder.setCountryName(item.country_name);
            return builder;
        })
        return resultat;
    }
    else
    {
        return dbResult.result;
    }
}

const findOne = async (id) => {
    const dbResult = await dbquery('get', 'SELECT builders.name, builders.id, builders.country, country.name as country_name FROM builders INNER JOIN country on builders.country=country.id WHERE builders.id=? ORDER BY builders.name', [id]);
    if (dbResult.error===0) {
        const resultArray=dbResult.result;
        if (resultArray.length > 0) {
            const result=dbResult.result[0];
            const builder = new Builder(result.id, result.name, result.country);
            builder.setCountryName(result.country_name);
            return builder;
        }
        else
            return{};
    }
    else
        return dbResult.result;
}

const addOne = async (builder) => {
    const dbResult=await dbquery('add', 'INSERT INTO builders (name,country) VALUES (?,?)',[builder.name,builder.countryId]);
    if (dbResult.error === 0) {
        builder.setId(dbResult.result);
        //Get country Name
        const dbCountry=await dbquery('get','SELECT name FROM country WHERE id=?',[builder.countryId]); 
        builder.setCountryName(dbCountry.result[0].name)
         return builder;
     }
     else {
        return dbResult.result;
    }
}

const updateOne = async (builder) => {
    const dbResult=await dbquery('update', 'UPDATE builders SET name=?, country=? WHERE id=?', [builder.name,builder.countryId, builder.id]);
    return dbResult;
}

const deleteOne = async (id) => {
    const dbResult=await dbquery('delete', 'DELETE FROM builders WHERE id=?', [id]);
    return dbResult;
}

module.exports = {
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne,
}