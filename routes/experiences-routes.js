const express = require('express');
const experiencesControllers = require('../controllers/experiences-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/:exid', experiencesControllers.getExperienceById);

router.get('/user/:uid', experiencesControllers.getExperienceByUserId);

router.use(checkAuth);

router.post('/', experiencesControllers.createExperience);

router.patch('/:exid', experiencesControllers.updateExperience);

router.delete('/:exid', experiencesControllers.deleteExperience);

module.exports = router;
