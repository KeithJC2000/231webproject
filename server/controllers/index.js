let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable JWT
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title:'Home', displayName:req.user ? req.user.displayName: '', adminUser: req.user ? req.user.adminUser : false});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title:'About', displayName:req.user ? req.user.displayName: '', adminUser: req.user ? req.user.adminUser : false});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', {title:'Projects', displayName:req.user ? req.user.displayName: '', adminUser: req.user ? req.user.adminUser : false});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', {title:'Services', displayName:req.user ? req.user.displayName: '', adminUser: req.user ? req.user.adminUser : false});
}

module.exports.displayvaccinePage = (req, res, next) => {
    res.render('index', {title:'vaccine', displayName:req.user ? req.user.displayName: '', adminUser: req.user ? req.user.adminUser : false});
}

module.exports.displayLoginPage= (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login',
          {
            title:"Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : '',
            adminUser: req.user ? req.user.adminUser : false
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) =>  {
    passport.authenticate('local',
    (err, user, info) => { 
        //server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user,(err) => {
            //server error?
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email,
                adminUser: user.adminUser,
                medicalUser: user.medicalUser
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

             /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});
            */

            return res.redirect('/vaccines-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    //check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessages'),
            displayName: req.user ? req.user.displayName : '',
            adminUser: req.user ? req.user.adminUser : false
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName,
        adminUser: false,
        medicalUser: false
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : '',
                adminUser: req.user ? req.user.adminUser : false
            });
        }
        else
        {
            // if no error exists, then registration is successful

            // redirect the user and authenticate them

             /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Registered Successfully!'});
            */

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/vaccines-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}