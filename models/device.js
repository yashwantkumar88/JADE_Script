var mongoose = require('mongoose');
var deviceSchema = new mongoose.Schema({
    imei:{
        type:String,
        unique:true
    },mac:{
        type:String,
        unique:true
    },os:{
        type:String
    },ssid:{
        type:String
    },date:{
        type:String
    }
});

var Device = mongoose.model('Device',deviceSchema);
module.exports = Device;