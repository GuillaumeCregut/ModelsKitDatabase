require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions=require('./config/corsConfig')
const router = require('./routes/index.routes');
const cookieParser = require('cookie-parser');
const headerConfig = require('./config/headerConfig');
const { logInfo, Emitter } =require('./utils/logEvent');
const {errorHandler} = require('./middlewares/errorHandler');
//Initialise 
const myEmitter=new Emitter();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(headerConfig);
app.use(cookieParser());
app.use(errorHandler);

app.use('/api/v1', router);
app.use('/assets/uploads',express.static('assets/uploads'));

app.get("/", (req, res) => {
  const version={
    edititor:"editiel98",
    name:"modelsback",
    version:'1.2'
  }
    res.json(version);
});



app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
  logInfo(`Server listening on port ${port}`);
});

module.exports = app;