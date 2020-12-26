const router = require('express').Router();

const studentProfileControllers = require('../controllers/student-controllers/viewProfile-controllers')
const studentAttendanceControllers = require('../controllers/student-controllers/studentAttendance-controllers')

// ViewProfile Route

router.get('/attendance/:sID',studentAttendanceControllers.getAttendance);

router.get('/:sID',studentProfileControllers.viewProfile);

module.exports = router;