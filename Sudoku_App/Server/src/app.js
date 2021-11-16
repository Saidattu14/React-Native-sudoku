const morgan = require('morgan');
const cors = require('cors');
const routes = require('./Routes');
const express = require('express');
const app = express();
const redis_client = require('./Redis/client')


app.use(express.json());
app.use(cors())

app.use('/api/sudoku', routes);


app.listen(9008,() => {
    console.log('server listening on 8001')
   })