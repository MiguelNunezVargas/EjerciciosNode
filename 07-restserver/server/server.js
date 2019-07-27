require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

/**Body parser */
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

/**traemos las rutas de usuario.js */
app.use(require('./routes/usuario'));


/**Conexion de moongose */
mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log("Base de datos Online");
});
mongoose.set('useCreateIndex', true);

app.listen(process.env.PORT, () => {
    console.log("escuchando en el puerto 3000");
});