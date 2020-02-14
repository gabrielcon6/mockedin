const express = require('express');
const feedbackControllers = require('../controllers/feedback-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/:fid', feedbackControllers.getFeedbackById);

router.get('/user/:uid', feedbackControllers.getFeedbackByUserId);

router.use(checkAuth);

router.patch('/:fid', feedbackControllers.updateFeedback);

module.exports = router;