const examController = require('../controllers/ExamController');
const router = require('express').Router();

router.post('/', examController.createExam);
router.get('/', examController.getAllExams);
router.put('/:examId/question/:questionId', examController.addQuestionToExam);

module.exports = router;