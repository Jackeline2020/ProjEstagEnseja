var express = require('express');
var router = express.Router();

// include technologiesGSC controller
const skillsGSC_controller = require('../controllers/skills.controller');

// routes
router.get('/', skillsGSC_controller.all_technologies);  
router.post('/create', skillsGSC_controller.technologies_create);
router.get('/:id', skillsGSC_controller.technologies_details);
router.put('/update/:id', skillsGSC_controller.technologies_update);
router.delete('/delete/:id', skillsGSC_controller.technologies_delete);

module.exports = router;