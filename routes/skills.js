var express = require('express');
const router = express.Router();

// include technologiesGSC controller
const skillsGSC_controller = require('../controllers/skills.controller');

// routes
router.get('/', skillsGSC_controller.list);  
router.post('/create', skillsGSC_controller.create);
router.get('/:id', skillsGSC_controller.show);
router.post('/put/:id', skillsGSC_controller.update);
router.post('/delete/:id', skillsGSC_controller.del);
  
module.exports = router;