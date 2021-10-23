const express = require('express');
const config = require('config');
const users = require('./routes/users');
const courses = require('./routes/courses');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/training_db')
.then(()=>console.log('Coneccion exitosa...'))
.catch(err => console.log('No se pudo conectar a mongodb...', err))

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/users', users)
app.use('/api/courses', courses)

//Configuración de entornos
console.log(`Aplicación: ${config.get('name')}`)
console.log(`DB Server: ${config.get('condigDB.host')}`)


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port} ...`)
})