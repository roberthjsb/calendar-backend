const express = require('express');
var cors = require('cors')
require('dotenv').config();
const {dbConnection}= require('./database/config')

const app = express();
dbConnection()

app.use(cors())
app.use(express.static('public'));
app.use(express.json());
//Rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/event', require('./routes/events'));

app.listen(process.env.PORT,()=>{console.log(`Server run port ${process.env.PORT}`)});
