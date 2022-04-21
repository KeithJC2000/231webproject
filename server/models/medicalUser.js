let mongoose = require('mongoose');

let MedicalUserModel = mongoose.Schema({
    name:String,
    email:String,
    displayName:String,
    role:String,
    company:String,
    created:String,
    edited:String
},
{
    collection:"medicalUsers"
});
module.exports = mongoose.model('medicalUsers', MedicalUserModel);
