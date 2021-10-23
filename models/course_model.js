const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: { type: String, required : true },    
    status: { type: Boolean, default : true },
    image: { type: String, required : false }
  });

module.exports = mongoose.model('Course', courseSchema);