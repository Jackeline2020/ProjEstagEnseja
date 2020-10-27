const express = require('express');
const router = express.Router();

// include technologiesGSC controller
const technologiesGSC_controller = require('../controllers/technologiesGSC');

// routes
router.get('/', technologiesGSC_controller.all_technologies, function(req, res, next) {
    if(err) {
        req.flash('error', err);
        // render to views/books/index.ejs
        res.render('technologies',{data:''});   
    } else {
        // render to views/books/index.ejs
        res.render('technologies',{data:rows});
    }
});
router.post('/create', technologiesGSC_controller.technologies_create);
router.get('/:id', technologiesGSC_controller.technologies_details);
router.put('/update/:id', technologiesGSC_controller.technologies_update);
router.delete('/delete/:id', technologiesGSC_controller.technologies_delete);

module.exports = router;