var express = require('express');
var router = express.Router();

var User = require('./models/user');
var Device = require('./models/device');


//Register post request
router.post('/register', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var newUser = User();
    newUser.username = username;
    newUser.password = password;
    var response = {success:"0",data:""};
    //Call Mongoose inbuilt save method
    newUser.save(function (err, savedUser) {
        if (err) {
            try{
                console.log(err);
                response.data = err;
                res.send(response);
                return;
            }catch(err){
                console.log(err);
            }
        }
        response.success = "1";
        console.log(savedUser);
        response.data = req.body.username;
        res.send(response);
    });
});
//Login post request
router.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var response = {success:"0",data:""};
    //Find user with given credentials in the database
    User.findOne({username: username, password: password}, function (err, user) {
        if (err) {
            try {
                response.data = err;
                res.send(response);
                return;
            } catch (err) {
                console.log(err);
            }
        }
        response.success = "1";
        if (!user) {
            response.data = "Not found";
            res.send(response);
        } else {
            console.log(user);
            response.data = "Welcome " + req.body.username;
            res.send(response);
        }
    });
});

//Register post request
router.post('/registerDevice', function (req, res) {
    var newDevice = Device();
    newDevice.imei = req.body.imei;
    newDevice.mac = req.body.mac;
    newDevice.os = req.body.os;
    newDevice.ssid = req.body.ssid;
    newDevice.date = new Date().getTime() / 1000;
    var response = {success:"0"};
    //Call Mongoose inbuilt save method
    newDevice.save(function (err, savedDevice) {
        if (err) {
            try{
                response.data = err;
                res.send(response);
            }catch(err){
                console.log(err);
            }
        }
        response.success = "1";
        res.send(response);
    });
});
//Login post request
router.post('/checkDevice', function (req, res) {
    //Find user with given credentials in the database
    var response = {success:"0",data:""};
    Device.findOne({imei: req.body.imei, mac:req.body.mac, ssid:req.body.ssid, os:req.body.os}, function (err, device) {
        if (err) {
            try {
                response.data = err;
                res.send(response);
                return;
            } catch (err) {
                console.log(err);
            }
        }
        response.success = "1";
        if (!device) {
            console.log(device);
            response.data = "Not found";
            res.send(response);
        } else {
            console.log(device);
            response.data = "Device found in database";
            res.send(response);
        }
    });
});

module.exports = router;