const express = require('express');
const Joi = require('joi');
const route = express.Router();
const Course = require('../models/course_model');

route.get('/',(req,resp)=>{
    let result = list()
    result
    .then(courses =>{
        resp.status(200).json({
            status : '200',
            data : courses
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
    let result = create(req.body)
    result
    .then( course => {
        resp.status(201).json({
            status : '201',
            data : course
        })
    })
    .catch(err =>{
        resp.status(400).json({
            status : '400',
            message : err
        })
    })   
})

const create = async (body) =>{
    const course = new Course({
        name : body.name        
    })
    
    return await course.save()
}

const list = async () => {       
    return result = await Course.find()
}

module.exports = route