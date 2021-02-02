const express = require ('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const myParser = require("body-parser");
const app = express();

const { mongoose } = require('./database');

app.set('port', process.env.PORT || 3000);

app.use(myParser.json());
app.use(myParser.urlencoded({
    extended: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/empleados',require('./routes/empleados.routes'));
app.use('/api/productos',require('./routes/productos.routes'));
app.use('/api/clientes',require('./routes/clientes.routes'));
app.use('/api/ventas',require('./routes/ventas.routes'));

app.listen(app.get('port'), ()=> {
    console.log("Server on port", app.get('port'));
});
