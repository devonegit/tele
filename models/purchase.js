const mongoose = require('mongoose');
const {Schema} = mongoose;


const UserSchema = new Schema({
    SKU:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    }
    
})
module.exports = mongoose.model('user', UserSchema)