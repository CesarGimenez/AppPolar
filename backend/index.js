const express = require ('express');
const morgan = require('morgan');
const app = express();

const { mongoose } = require('./database');

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/empleados',require('./routes/empleados.routes'));

app.listen(app.get('port'), ()=> {
    console.log("Server on port", app.get('port'));
});