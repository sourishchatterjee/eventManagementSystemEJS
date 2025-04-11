const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength:4,
    maxLength:40
  },
  description: {
    type: String,
    minLength:4,
    maxLength:50,
    required: true,
    
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
},
  eventDate: {
    type: Date,
    required: true
  },
  organizerName: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,  
    required: false
  },
  status: {
    type: String,
    default: 'active' ,
  },
  
},{
    versionKey:false,
    timestamps:true,
});

const eventModel = mongoose.model('Event', eventSchema);

module.exports = eventModel;
