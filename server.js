const yargs = require('yargs');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { Glider } = require('./models/glider');
const { Body } = require('./models/body');
const { Driver } = require('./models/driver');
const { DriverModel } = require('./models/driverModel');
const { Tire } = require('./models/tire');
const ObjectID = mongoose.Types.ObjectId;

const app = express();

app.use(bodyParser.json());

app.post('/tire', (req, res) => new Tire({ 
    name:req.body.name, 
    speedGnd:req.body.speedGnd, 
    speedWtr:req.body.speedWtr,
    speedAir:req.body.speedAir, 
    speedGty:req.body.speedGty, 
    acceleration:req.body.acceleration,
    weight:req.body.weight, 
    handlingGnd:req.body.handlingGnd, 
    handlingWtr:req.body.handlingWtr,
    handlingAir:req.body.handlingAir, 
    handlingGty:req.body.handlingGty, 
    grip:req.body.grip,
    miniturbo:req.body.miniturbo, 
}).save().then(Tire => res.send(Tire)).catch(err => res.status(500).send(err)));
app.post('/body', (req, res) => new Body(
    { 
        name: req.body.name,
        speedGnd: req.body.speedGnd,
        speedWtr: req.body.speedWtr,
        speedAir: req.body.speedAir,
        speedGty: req.body.speedGty,
        acceleration: req.body.acceleration,
        weight: req.body.weight,
        handlingGnd: req.body.handlingGnd,
        handlingWtr: req.body.handlingWtr,
        handlingAir: req.body.handlingAir,
        handlingGty: req.body.handlingGty,
        grip: req.body.grip,
        miniturbo: req.body.miniturbo
    }
).save().then(body => res.send(body)).catch(err => res.status(500).send(err)));

app.get('/user', (req, res) => User.find((err, users) => res.json(users)));

app.get('/user/:id', (req, res) => ObjectID.isValid(req.params.id) ? User.findById(req.params.id).then(user => user ? res.json(user) : res.status(404).send()) : res.status(404).send());

app.delete('/user/:id', (req, res) => ObjectID.isValid(req.params.id) ? User.findByIdAndRemove(req.params.id).then(user => user ? res.json(user) : res.status(404).send()) : res.status(404).send());
/*
model
GET model
GET model/id
POST model
DELETE model/id
PUT model/id
*/

//driver
app.get('/driver', (req, res) => Driver.find((err, drivers) => err ? res.status(500).send(err) : res.json(drivers)));
app.get('/driver/:id', (req, res) => ObjectID.isValid(req.params.id) ? Driver.findById(req.params.id).then(driver => driver ? res.json(driver) : res.status(404).send()) : res.status(404).send());
app.post('/driver', (req, res) => new Driver({ name:req.body.name, size:req.body.size, driverModel:req.body.driverModel }).save().then(driver => res.send(driver)).catch(err => res.status(500).send(err)));
app.delete('/driver/:id', (req, res) => ObjectID.isValid(req.params.id) ? Driver.findByIdAndRemove(req.params.id).then(driver => driver ? res.json(driver) : res.status(404).send()) : res.status(404).send());

const port = yargs.argv.port && !isNaN(yargs.argv.port) && yargs.argv.port > 0 && !(yargs.argv.port % 1) ? yargs.argv.port : 3000;
app.listen(port, () => console.log("Server listen on port ", port));