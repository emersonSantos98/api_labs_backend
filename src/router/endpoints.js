const router = require('express').Router();
const StartupController = require('../controllers/startup.Controller');
const startupController = new StartupController();

router.post('/startups', startupController.createStartup);

module.exports = router;
