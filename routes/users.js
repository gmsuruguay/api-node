const express = require('express');
const Joi = require('joi');
const route = express.Router();

const users = [
    {id: 1,nombre:'Martin'},
    {id: 2,nombre:'Carlos'},
    {id: 3,nombre:'Morena'},
    {id: 4,nombre:'Leila'},
]

route.get('/:id',(req,resp)=>{

    let user = users.find(record => record.id === parseInt(req.params.id))

    if (!user) {
        resp.status(404).send('El usuario no existe')
    }
    resp.send(user)
})

route.get('/',(req,resp)=>{    
    resp.send(users)
})

route.post('/',(req,resp)=>{

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

route.put('/:id',(req,resp)=>{

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

route.delete('/:id',(req,resp)=>{

    let user = users.find(record => record.id === parseInt(req.params.id))

    if (!user) {
        resp.status(404).send('El usuario no existe')
        return
    }

    let index = users.indexOf(user)
    users.splice(index,1)
    resp.send(user)
    
    
})

module.exports = route