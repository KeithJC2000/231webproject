let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { route } = require('.');

let passport = require('passport');

let vaccineController = require('../controllers/vaccine');

//helper function for guard purposes
function requireAuth(req,res,next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// Get Route for the vaccine list page - READ Operation
router.get('/', vaccineController.displayvaccineList);

// Get Route for displaying the Add page - Create Operation
router.get('/add', requireAuth, vaccineController.displayAddPage);

// Post Route for processing the Add page - Create Operation
router.post('/add', requireAuth, vaccineController.processAddPage);

// Get Route for displaying the Edit page - Update Operation
router.get('/edit/:id', requireAuth, vaccineController.displayEditPage);

// Post Route for processing the Edit page - Update Operation
router.post('/edit/:id', requireAuth, vaccineController.processEditPage);

// Get to perform Deletion - Delete Operation
router.get('/delete/:id', requireAuth, vaccineController.performDelete);

module.exports = router;