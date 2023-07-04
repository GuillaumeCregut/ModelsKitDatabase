const { dbquery } = require('../utils/dbutils');
const connection = require('../dbconfig');
const Order = require('../classes/Order.class');
const supplierModel = require('./supplier.model');

const connectionPromise = connection.promise();
//User defined exception
class MyError extends Error {
    constructor(value) {
        super(`L'Error ${value} thrown`);
        this.errno = value;
    }
}

//get all model for users where
getModelWishes = async (idUser) => {
    const result = await dbquery('get', 'SELECT id,model FROM model_user WHERE state=4 AND owner=?', [idUser])
    if (result.error===0) {
        return result.result;
    }
    else return result.result;
}

const changWishes = async (wish, model, order) => {
    const { providerId } = order;
    const { price } = model;
    let qtty = model.qtty - 1;
    //On modifie la ligne en BDD
    connectionPromise.execute('UPDATE model_user SET price=?, provider=? state=5 WEHRE id=?', [price, providerId, wish.id])
    //(providerId,price,5,wish.id)
    if (qtty > 0) {
        while (qtty > 0) {
            const addResult = await addModelToUser(model, order)
            qtty--;
        }

    }
    return [wish.id, qtty];
}

const findAll=async()=>{
    const dbOrders = await dbquery('get', 'SELECT o.provider, o.owner,o.reference, p.name FROM orders o INNER JOIN provider p ON o.provider=p.id');
    if (dbOrders.error===0) {
        const orderList = dbOrders.result.map((order) => {
            const newOrder = new Order(order.provider,  order.owner, order.reference);
            newOrder.setProviderName(order.name);
            return newOrder;
        })
        //Get All items from orders.
        for(let i=0;i<orderList.length;i++){
            const order=orderList[i];
            const dbItems = await dbquery('get', 'SELECT mo.id, mo.model_id,mo.qtte,mo.price,m.name FROM model_order mo INNER JOIN model m ON mo.model_id=m.id  WHERE mo.order_id=?', [order.reference]);
            if (dbItems.error===0) {
                dbItems.result.forEach((model) => {
                    const newModel = {
                        id: model.model_id,
                        qtty: model.qtte,
                        price: model.price,
                        name: model.name
                    }
                    orderList[i].addModels(newModel);
                })
            }
        }
        return orderList;
    }
    else return dbOrders.result;
}

const findAllUser = async (id) => {
    //Get all orders
    const dbOrders = await dbquery('get', 'SELECT o.provider,o.reference, p.name FROM orders o INNER JOIN provider p ON o.provider=p.id WHERE o.owner=?', [id]);
    if (dbOrders.error===0) {
        if (dbOrders.result.length===0)
            return [];
        const orderList = dbOrders.result.map((order) => {
            const newOrder = new Order(order.provider, id, order.reference);
            newOrder.setProviderName(order.name);
            return newOrder;
        })
        //Get All items from orders.
        for(let i=0;i<orderList.length;i++){
            const order=orderList[i];
            const dbItems = await dbquery('get', 'SELECT mo.id, mo.model_id,mo.qtte,mo.price,m.name FROM model_order mo INNER JOIN model m ON mo.model_id=m.id WHERE mo.order_id=?', [order.reference]);
            if (dbItems.error===0) {
                dbItems.result.forEach((model) => {
                    const newModel = {
                        id: model.model_id,
                        qtty: model.qtte,
                        price: model.price,
                        name: model.name
                    }
                    orderList[i].addModels(newModel);
                })
            }
        }
        return orderList;
    }
    else if (dbOrders === -1) {
        return dbOrders;
    }
    else return undefined;
}

const findOne=async(id)=>{
    const dbOrders = await dbquery('get', 'SELECT o.provider, o.owner,o.reference, p.name FROM orders o INNER JOIN provider p ON o.provider=p.id WHERE o.reference=?',[id]);
    if (dbOrders.error===0) {
        const orderList = dbOrders.result.map((order) => {
            const newOrder = new Order(order.provider,  order.owner, order.reference);
            newOrder.setProviderName(order.name);
            return newOrder;
        })
        //Get All items from orders.
        for(let i=0;i<orderList.length;i++){
            const order=orderList[i];
            const dbItems = await dbquery('get', 'SELECT mo.id, mo.model_id,mo.qtte,mo.price,m.name FROM model_order mo INNER JOIN model m ON mo.model_id=m.id  WHERE mo.order_id=?', [order.reference]);
            if (dbItems.error===0) {
                dbItems.result.forEach((model) => {
                    const newModel = {
                        id: model.model_id,
                        qtty: model.qtte,
                        price: model.price,
                        name: model.name
                    }
                    orderList[i].addModels(newModel);
                })
            }
        }
        return orderList[0]||[];
    }
    else return dbOrders.result;
}



const addOne = async (order) => {
    const wishes = await getModelWishes(order.ownerId);
    await connectionPromise.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    //await connectionPromise.beginTransaction();
    await connectionPromise.query('START TRANSACTION');
    try {
        //Create Order in DB
        await connectionPromise.execute("INSERT INTO orders (owner,provider,reference,dateOrder) VALUES(?,?,?,?)", [order.ownerId, order.providerId, order.reference,order.dateOrder])
        //check models
        const { models } = order;
        try {
            for (let i = 0; i < models.length; i++) {
                const model = models[i];
                //Insertion de la commande
                await connectionPromise
                    .execute('INSERT INTO model_order (model_id,order_id,price,qtte) VALUES (?,?,?,?)', [model.idModel, order.reference, model.price, model.qtty])
                const index = wishes.findIndex((wish) => wish.model === model.idModel);
                if (index > -1) {
                    const wish = wishes[index];
                    await connectionPromise
                        .execute('UPDATE model_user SET price=?, provider=?, state=5 WHERE id=?', [model.price, order.providerId, wish.id])
                    if (model.qtty > 1) {
                        let qtty = model.qtty - 1;
                        while (qtty > 0) {
                            await connectionPromise
                                .execute('INSERT INTO model_user (price,model,owner,provider,state) VALUES (?,?,?,?,5)', [model.price, model.idModel, order.ownerId, order.providerId])
                            qtty--;
                        }
                    }
                }
                else {
                    let qtty = model.qtty;
                    while (qtty > 0) {
                        await connectionPromise
                            .execute('INSERT INTO model_user (price,model,owner,provider,state) VALUES (?,?,?,?,5)', [model.price, model.idModel, order.ownerId, order.providerId])
                        qtty--;
                    }
                }
            }
        }
        catch (err) {
            console.error(err)
            throw new MyError(err.errno)
        }
        //await connectionPromise.commit();
        await connectionPromise.query('COMMIT');
        const supplier = await supplierModel.findOne(order.providerId);
        order.setProviderName(supplier.name)
        return order;
    }
    catch (err) {
        console.error(err);
       // connectionPromise.rollback();
       await connectionPromise.query('ROLLBACK');
        if (err.errno === 1062)
            return -1;
        if (err.errno === 1452)
            return -2;
        else
            return undefined;
    }
}

const deleteOne=async(id)=>{
    //delete all model_order
    const removeResult=await dbquery('delete','DELETE FROM model_order WHERE order_id=?',[id])
    if(removeResult.error===0){
        const removeOrder=await dbquery('delete', 'DELETE FROM orders WHERE reference=?',[id]);
        return removeOrder;
    }
    else return removeResult.result;
}

module.exports = {
    addOne,
    findAllUser,
    findAll,
    deleteOne,
    findOne
}