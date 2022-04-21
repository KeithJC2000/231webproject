let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

let medicalUser = require('../models/medicalUser')

module.exports.displayMedicalUsers = (req, res, next) => {
    User.find((err, userList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // console.log(vaccineList);
            res.render('medicalUser/list', 
            {
                title: 'Users', userList: userList, 
                displayName: req.user ? req.user.displayName : '',
                medicalUser: req.user ? req.user.medicalUser : false,
                adminUser: req.user ? req.user.adminUser : false
            })
        }
    });
}

module.exports.displayAddMedicalUserPage = (req,res,next) =>{
    res.render('medicalUser/add', {title: 'Add Medical User'})
}

module.exports.processAddMedicalUserPage= (req,res,next) =>{

    var createdDate = Date.now();
    var shortdate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(createdDate);
    console.log(shortdate)

    let newMedicalUser = User({
        displayName: req.body.txtStaffName,
        username: req.body.txtStaffName,
        email: req.body.txtStaffEmail,
        adminUser: false,
        medicalUser: true,
        created: shortdate,
        update: shortdate,
    });

    medicalUser.create(newMedicalUser, (err, medicalUser) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/medicalUser-list');
        }
    });

}

module.exports.displayEditMedicalUserPage = (req,res,next) => {
    let id = req.params.id;

    User.findById(id, (err, medicalUserList) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit now
            res.render('medicalUser/edit', 
            {
                title:'Edit Medical Users',
                medicalUser: medicalUserList,
                displayName: req.user ? req.user.displayName : '',
                medicalUser: req.user ? req.user.medicalUser : false,
                adminUser: req.user ? req.user.adminUser : false
            })
        }
    });
}

module.exports.processEditMedicalUserPage= (req,res,next) =>{
    let id = req.params.id

    let updatedMedicalUser = medicalUser({
        "_id": id,
        "name": req.body.txtStaffName,
        "email": req.body.txtStaffEmail,
        "userName": req.body.txtUserName,
        "role":req.body.txtRole,
        "company":req.body.txtCompany
    });

    medicalUser.updateOne({_id: id}, updatedMedicalUser, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/medicalUser-list');
        }
    });
}

module.exports.performDelete = (req,res,next) =>{
    let id = req.params.id;

    medicalUser.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/medicalUser-list');
        }
    });

}