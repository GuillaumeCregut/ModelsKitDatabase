const { format } = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const EventEmitter = require('events');

class Emitter extends EventEmitter { };

const devMode = process.env.DEBUG_MODE==='ON'?true:false;

const logFile = async (message, file) => {
    if (!devMode) {  
        const newDate = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
        const logItem = `${newDate} : \t${message}\n`;
        try {
            if (!fs.existsSync(path.join(__dirname, '..','assets' , 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..','assets' ,'logs'));
            }
            await fsPromises.appendFile(path.join(__dirname, '..','assets' , 'logs', file), logItem)
        } catch (err) {
            console.error(err)
        }
    }
}

const logInfo = async (message) => {
    logFile(message, 'infos.txt')
}

const logError = async (message) => {
    logFile(message, 'errors.txt')
}

const logWarning = async (message) => {
    logFile(message, 'warnings.txt')
}

module.exports = {
    logInfo,
    logError,
    Emitter,
    logWarning
}