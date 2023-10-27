const mongoose = require('mongoose');
const {Schema} = mongoose;


const UserSchema = new Schema({
    Botid:{
        type:Number,
        required:true
    },
    SKU:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Type: {
        type:String,
        required:true
    },
    Status: {
        type:String,
        required:true
    },
    Date: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
      },
    
})
module.exports = mongoose.model('Purchase_Order', UserSchema)