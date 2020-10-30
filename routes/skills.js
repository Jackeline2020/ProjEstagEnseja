var express = require('express');
var router = express.Router();

// include technologiesGSC controller
const skillsGSC_controller = require('../controllers/skills.controller');

// routes
router.get('/', skillsGSC_controller.list);  
router.post('/create', skillsGSC_controller.create);
router.get('/:id', skillsGSC_controller.show);
router.put('/update/:id', skillsGSC_controller.update);
router.delete('/delete/:id', skillsGSC_controller.delete);
  
module.exports = router;