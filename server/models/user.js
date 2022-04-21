//require modules for the user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username:
        {
            type:String,
            default:'',
            trim:true,
            required: 'username is required'
        },
        /* password:
        {
            type:String,
            default: ''.
            trim:true.
            required:'password is required'
        } */
        email:
        {
            type:String,
            default:'',
            trim:true,
            require:'email address is required'
        },
        displayName:
        {
            type:String,
            default:'',
            trim:true,
            require:'Display Name is required'
        },
        created:
        {
            type:Date,
            default:Date.now
        },
        update:
        {
            type:Date,
            default:Date.now
        },
        adminUser:
        {
            //A Database admin needs to change this setting in the mongo DB to give access - there is no UI for this functionality
            type: Boolean,
            default: false
        },
        medicalUser:
        {
            //This is set once logged in with an admin and creating a medical user account
            type: Boolean,
            default: false
        },
        userMonitor:
        {
            //This is set once logged in with an admin and creating a user Monitor account
            type: Boolean,
            default: false
        }
    },
    {
        collection:"users"
    }
);

//configure options for User Model
let options = ({missingPasswordError:'Wrong/Missing password'});

User.plugin(passportLocalMongoose, options);

module.exports.User =  mongoose.model('User', User);