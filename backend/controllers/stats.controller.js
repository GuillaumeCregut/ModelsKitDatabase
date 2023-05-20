const { logError } =require('../utils/logEvent');
const modelModel = require('../models/model.model');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { createPie } = require('../utils/generatePie');
const { createPDF } = require('../utils/pdf');

const createFolder = async (thePath) => {
    if (!fs.existsSync(thePath)) {
        await fsPromises.mkdir(thePath, { recursive: true });
    }
}

const generateDatas = (datas) => {
    const labels = datas.map((data) => data.name);
    const dataContent = datas.map((data) => data.count);
    return [labels, dataContent];
}


const rmdir = (dir) => {
    const list = fs.readdirSync(dir);
    try {
        for (let i = 0; i < list.length; i++) {
            const filename = path.join(dir, list[i]);
            const stat = fs.statSync(filename);

            if (filename == "." || filename == "..") {
                // pass these files
            } else if (stat.isDirectory()) {
                // rmdir recursively
                rmdir(filename);
            } else {
                // rm filename
                fs.unlinkSync(filename);
            }
        }
        fs.rmdirSync(dir);
    }
    catch (err) {
        logError(`StatsController.rmdir : ${err}`);
        console.error(err);
    }
};

const doStats = async (req, res) => {
    const dataUser=[];
    const { firstname, lastname } = req.user;
    const userName = `${firstname} ${lastname}`;
    const id = req.params.id; //
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    //Remove old file 
    try {
        if (fs.existsSync(path.join(__dirname, '..', 'assets', 'uploads', 'users', `${id}`, 'stats.pdf'))) {
            //file exists
            fs.unlinkSync(path.join(__dirname, '..', 'assets', 'uploads', 'users', `${id}`, 'stats.pdf'));
        }
    }
    catch (err) {
        logError(`StatController.doStats : ${err}`);
        console.error(err)
    }
    const userId = parseInt(id, 10);
    const pathTemp = path.join(__dirname, '..', 'temp', 'generator', id);
    //Créer le répertoire si ce n'est pas fait
    createFolder(pathTemp);
    //Générer les différents graphes
    const stateResult = await modelModel.getStateModelState(id);
    if (stateResult && stateResult !== -1) {
        if (stateResult.length > 0) {
            let [labels, dataContent] = generateDatas(stateResult);
            try {
                await createPie(400, 400, labels, dataContent, pathTemp + '/state.png');
            }
            catch (err) {
                logError(`StatController.doStats : ${err}`);
                console.error(err);
                return res.sendStatus(500);
            }
        }
        else return res.sendStatus(404)
    }
    else if (stateResult === -1){
        console.error('state', perdiodResult);
        return res.sendStatus(500);
    }
    //Get period result
    const perdiodResult = await modelModel.getStatModelPeriod(id);
    if (perdiodResult && perdiodResult !== -1) {
        
        dataUser.push({title:"périodes",data:perdiodResult});
        [labels, dataContent] = generateDatas(perdiodResult);
        try {
            await createPie(400, 400, labels, dataContent, pathTemp + '/period.png');
        }
        catch (err) {
            logError(`StatController.doStats : ${err}`);
            console.error(err);
            return res.sendStatus(500);
        }
    }
    else if (perdiodResult === -1){
        console.error('period', perdiodResult);
        return res.sendStatus(500);
    }
    //get Category result
    const categoryResult = await modelModel.getStatModelType(id);
    if (categoryResult && categoryResult !== -1) {
        dataUser.push({title:"catégories",data:categoryResult});
        [labels, dataContent] = generateDatas(categoryResult);
        try {
            await createPie(400, 400, labels, dataContent, pathTemp + '/category.png');
        }
        catch (err) {
            logError(`StatController.doStats : ${err}`);
            console.error(err);
            return res.sendStatus(500);
        }
    }
    else if (categoryResult === -1){
        console.error('categoryResult', categoryResult);
        return res.sendStatus(500);
    }
    //get provider result
    const providerResult = await modelModel.getStatModelProvider(id);
    if (providerResult && providerResult !== -1) {
        dataUser.push({title:"fournisseurs",data:providerResult});
        [labels, dataContent] = generateDatas(providerResult);
        try {
            await createPie(400, 400, labels, dataContent, pathTemp + '/provider.png');
        }
        catch (err) {
            logError(`StatController.doStats : ${err}`);
            console.error(err);
            return res.sendStatus(500);
        }
    }
    else if (providerResult === -1){
        console.error('provider', providerResult);
        return res.sendStatus(500);
    }
    //get scale result
    const scaleResult = await modelModel.getStatModelScale(id);
    if (scaleResult && scaleResult !== -1) {
        dataUser.push({title:"échelles",data:scaleResult});
        [labels, dataContent] = generateDatas(scaleResult);
        try {
            await createPie(400, 400, labels, dataContent, pathTemp + '/scale.png');
        }
        catch (err) {
            logError(`StatController.doStats : ${err}`);
            return res.sendStatus(500);
        }
    }
    else if (scaleResult === -1){
        console.error('scale', perdiodResult);
        return res.sendStatus(500);
    }
    //get brand result
    const brandResult = await modelModel.getStatModelBrand(id);
    if (brandResult && brandResult !== -1) {
        dataUser.push({title:"marques",data:brandResult});
        [labels, dataContent] = generateDatas(brandResult);
        try {
            await createPie(400, 400, labels, dataContent, pathTemp + '/brand.png');
        }
        catch (err) {
            logError(`StatController.doStats : ${err}`);
            return res.sendStatus(500);
        }
    }
    else if (brandResult === -1){
        console.error('brand', perdiodResult);
        return res.sendStatus(500);
    }
    //get price info
    let totalPrice = 0;
    const priceResult = await modelModel.getStatModelPrice(id);
    if (priceResult && priceResult !== -1) {
        totalPrice = priceResult[0].sum;
    }
    else if (priceResult === -1)
        return res.sendStatus(500);
    //Get Models fromo list
    const allModels = await modelModel.getAllKitsUser(id);
    //Générer le PDF
    try {
       await  createPDF(res, pathTemp, priceResult[0].sum, userName, stateResult, allModels, id,dataUser);
       
    }
    catch (err){
        logError(`StatController.doStats : ${err}`);
        console.error(err)
        return res.sendStatus(500);
    }
    setTimeout(() => {
        rmdir(pathTemp);
        const dlPath=path.join('assets','uploads','users',`${userId}`,'stats.pdf');
      // res.json({path: dlPath});
    }, 5000)

}

module.exports = {
    doStats,
}