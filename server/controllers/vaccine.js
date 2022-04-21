let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

//create a reference to the model
let vaccine = require('../models/vaccine')

module.exports.displayvaccineList = (req, res, next) => {
    vaccine.find((err, vaccineList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // console.log(vaccineList);
            res.render('vaccine/list', {
                title: 'vaccines',
                vaccineList: vaccineList,
                displayName: req.user ? req.user.displayName : '',
                adminUser: req.user ? req.user.adminUser : false,
                medicalUser: req.user ? req.user.medicalUser : false,
                userMonitor: req.user ? req.user.userMonitor : false
            })
        }
    });
}

module.exports.displayAddPage = (req,res,next) =>{
    res.render('vaccine/add', {title: 'Add vaccine', adminUser: req.user ? req.user.adminUser : false})
}

module.exports.processAddPage= (req,res,next) =>{
    let newvaccine = vaccine({
        "Date": req.body.Date,
        "vaccineName": req.body.vaccineName,
        "vaccineQuantity": req.body.vaccineQuantity,
        "suitableAge":req.body.suitableAge,
        "walkIn":req.body.walkIn,
        "Appointment":req.body.Appointment,
    });
    vaccine.create(newvaccine, (err, vaccine) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the vaccines list
            res.redirect('/vaccines-list');
        }
    });
}

module.exports.displayEditPage=(req,res,next) =>{
    let id = req.params.id;

    vaccine.findById(id, (err, vaccineToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit now
            res.render('vaccine/edit', 
            {
                title:'Edit vaccine', vaccine: vaccineToEdit,
                displayName: req.user ? req.user.displayName : '',
                medicalUser: req.user ? req.user.medicalUser : false,
                adminUser: req.user ? req.user.adminUser : false
            })
        }
    });
}

module.exports.processEditPage= (req,res,next) =>{
    let id = req.params.id

    let updatedvaccine = vaccine({
        "_id": id,
        "Date": req.body.Date,
        "vaccineName": req.body.vaccineName,
        "vaccineQuantity": req.body.vaccineQuantity,
        "suitableAge":req.body.suitableAge,
        "walkIn":req.body.walkIn,
        "Appointment":req.body.Appointment,
    });

    vaccine.updateOne({_id: id}, updatedvaccine, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the vaccines list
            res.redirect('/vaccines-list');
        }
    });
}

module.exports.performDelete = (req,res,next) =>{
    let id = req.params.id;

    vaccine.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the vaccines list
            res.redirect('/vaccines-list');
        }
    });

}