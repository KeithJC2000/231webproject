let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let medicalUserController = require('../controllers/medicalUser');

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
router.get('/', medicalUserController.displayMedicalUsers);

// Get Route for displaying the Add page - Create Operation
router.get('/add', requireAuth, medicalUserController.displayAddMedicalUserPage);

// Post Route for processing the Add page - Create Operation
router.post('/add', requireAuth, medicalUserController.processAddMedicalUserPage);

// Get Route for displaying the Edit page - Update Operation
router.get('/edit/:id', requireAuth, medicalUserController.displayEditMedicalUserPage);

// Post Route for processing the Edit page - Update Operation
router.post('/edit/:id', requireAuth, medicalUserController.processEditMedicalUserPage);

// Get to perform Deletion - Delete Operation
router.get('/delete/:id', requireAuth, medicalUserController.performDelete);

module.exports = router;