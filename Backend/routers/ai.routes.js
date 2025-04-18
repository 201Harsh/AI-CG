const router = require('express').Router();
const AiController = require('../controllers/ai.controller');

router.post('/codegen',AiController.generateCode)


module.exports = router;