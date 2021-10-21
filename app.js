const express = require('express');
const config = require('config');
const users = require('./routes/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/users', users)

//Configuración de entornos
console.log(`Aplicación: ${config.get('name')}`)
console.log(`DB Server: ${config.get('condigDB.host')}`)


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port} ...`)
})