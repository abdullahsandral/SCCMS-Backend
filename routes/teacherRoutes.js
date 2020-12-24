const router = require('express').Router();

const techersControllers = require('../controllers/teacher-controllers/viewProfile-controllers');
const techersSubjectsControllers = require('../controllers/teacher-controllers/attendance-controllers');

// ViewProfile Route

router.get('/:tID',techersControllers.viewProfile);

// Attendance

router.get('/subjects/:tID',techersSubjectsControllers.getTeacherSubjects);

router.post('/getAttendance',techersSubjectsControllers.getSubjectAttendance);

router.post('/markAttendance',techersSubjectsControllers.markSubjectAttendance);

router.patch('/markAttendance',techersSubjectsControllers.updateSubjectAttendance);


module.exports = router;