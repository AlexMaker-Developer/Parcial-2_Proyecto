require("dotenv").config();

// Declaracion de constantes
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;
const path = require("path");
const app = express();


app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/app/dist/Adminproo')));

// Routes
app.use('/api/alumnos', require('./routes/alumnos'));
app.use('/api/docentes', require('./routes/docentes'));
app.use('/api/materias', require('./routes/materias'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));

// Start server
app.listen(port, err => {
    if (err) {
        console.error('ERROR in your server check on:' + err);
        return;
    }
    console.log('Your server is running on localhost:' + port + '\n--------------------------------');
});