const express = require('express');
const Joi = require('joi');
const User = require('../models/user_model');
const route = express.Router();

const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password : Joi.string().min(6).required(),
});

route.get('/:email',(req,resp)=>{

    let result = list(req.params.email)
    result
    .then(user =>{
        resp.status(200).json({
            status : '200',
            data : user
        })
    })
    .catch(err =>{
        resp.status(400).json({
            status : '400',
            message : err
        })
    })
})

route.get('/',(req,resp)=>{    
    let result = list()
    result
    .then(users =>{
        resp.status(200).json({
            status : '200',
            data : users
        })
    })
    .catch(err =>{
        resp.status(400).json({
            status : '400',
            message : err
        })
    })
})

route.post('/',(req,resp)=>{   

    const {error, value} = schema.validate({name: req.body.name, email: req.body.email, password: req.body.password })

    if (!error) {

        const result = create(req.body)
        result
        .then(user =>{
            resp.status(201).json({
                status : '201',
                data : user
            })       
        })
        .catch(err=>{
            resp.status(400).json({
                status : '400',
                message : err
            })
        })
        
    } else {
        resp.status(400).send({
            status : '400',
            message : error
        })
    }
    
})

route.put('/:email',(req,resp)=>{

    let result = update(req.params.email, req.body)

    result
    .then(user =>{
        resp.status(200).json({
            status : '200',
            data : user
        })       
    })
    .catch(err=>{
        resp.status(400).json({
            status : '400',
            message : err
        })
    })
   
    
})

route.delete('/:email',(req,resp)=>{

    let result = deactivate(req.params.email)

    result
    .then(user =>{
        resp.status(200).json({
            status : '200',
            data : user
        })       
    })
    .catch(err=>{
        resp.status(400).json({
            status : '400',
            message : err
        })
    })
   
})

const create = async (body) =>{
    const user = new User({
        name : body.name,
        email : body.email,
        password: body.password        
    })
    
    return await user.save()
}

const update = async (email,body) =>{
    let user = await User.findOneAndUpdate(email, {
        $set:{
            name : body.name,
            password : body.password
        }
    },{new : true})

    return user
}

const deactivate = async (email) =>{
    let user = await User.findOneAndUpdate(email, {
        $set:{
            status : false          
        }
    },{new : true})

    return user
}

const list = async (email = null) => { 
    if (email == null) {        
        return result = await User.find({status:true})
    }    
    return result = await User.findOne({email:email})  
}

module.exports = route