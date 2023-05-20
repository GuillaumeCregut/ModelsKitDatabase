const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const createUpload = async () => {
    if (!fs.existsSync(path.join(__dirname, '..','assets' ,'uploads'))) {
        await fsPromises.mkdir(path.join(__dirname, '..','assets','uploads'));
    }
}

const createSubUpload= async (dir)=>{
    await createUpload();
    if (!fs.existsSync(path.join(__dirname, '..', 'assets','uploads',dir))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'assets','uploads',dir));
    }
}

module.exports={
    createUpload,
    createSubUpload,
}