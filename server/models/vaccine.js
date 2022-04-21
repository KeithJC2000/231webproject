let mongoose = require('mongoose');

//create a model calss
let vaccineModel = mongoose.Schema({
    Date:String,
    vaccineName:String,
    vaccineQuantity:Number,
    suitableAge:String,
    walkIn:Number,
    Appointment:Number,
},
{
    collection:"vaccine"
});
module.exports = mongoose.model('vaccine', vaccineModel);
