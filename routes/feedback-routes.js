const express = require('express');
const feedbackControllers = require('../controllers/feedback-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/:fid', feedbackControllers.getFeedbackById);

router.get('/user/:fid', feedbackControllers.getFeedbackByUserId);

router.use(checkAuth);

router.post('/', feedbackControllers.createFeedback);

router.patch('/:fid', feedbackControllers.updateFeedback);

router.delete('/:fid', feedbackControllers.deleteFeedback);

module.exports = router;
