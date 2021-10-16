const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const users = [
    {id: 1,nombre:'Martin'},
    {id: 2,nombre:'Carlos'},
    {id: 3,nombre:'Morena'},
    {id: 4,nombre:'Leila'},
]

app.get('/api/users/:id',(req,resp)=>{

    let user = users.find(record => record.id === parseInt(req.params.id))

    if (!user) {
        resp.status(404).send('El usuario no existe')
    }
    resp.send(user)
})

app.get('/api/users',(req,resp)=>{    
    resp.send(users)
})

app.post('/api/users',(req,resp)=>{

    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
    });

    const {error, value} = schema.validate({ nombre: req.body.nombre })

    if (!error) {

        let user = {
            id: users.length + 1,
            nombre: value.nombre
        }
    
        users.push(user)
        resp.send(user)
        
    } else {
        resp.status(400).send(error.details[0].message)
    }
    
})

app.put('/api/users/:id',(req,resp)=>{

    let user = users.find(record => record.id === parseInt(req.params.id))

    if (!user) {
        resp.status(404).send('El usuario no existe')
    }

    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
    });

    const {error, value} = schema.validate({ nombre: req.body.nombre })

    if (error) {       
        resp.status(400).send(error.details[0].message)
        return
    } else {
        user.nombre = value.nombre
        resp.status(200).send(user)
    }
    
})

app.delete('/api/users/:id',(req,resp)=>{

    let user = users.find(record => record.id === parseInt(req.params.id))

    if (!user) {
        resp.status(404).send('El usuario no existe')
        return
    }

    let index = users.indexOf(user)
    users.splice(index,1)
    resp.send(user)
    
    
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port} ...`)
})