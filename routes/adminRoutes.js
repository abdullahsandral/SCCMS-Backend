const router = require('express').Router();

const fileUpload = require('../middelware/file-upload');

const studentsControllers = require('../controllers/admin-controllers/students-controllers');
const subjectsControllers = require('../controllers/admin-controllers/subjects-controllers');
const teachersControllers = require('../controllers/admin-controllers/teachers-controllers');
const timetableControllers = require('../controllers/admin-controllers/timetable-controllers');

// Students Routes

router.get('/students', studentsControllers.getAllStudents);

router.get('/students/:sID' , studentsControllers.getStudentById);

router.post('/students/' , fileUpload.single('newStudentImage'), studentsControllers.createNewStudent);

router.post('/students/:sID' , fileUpload.single('newStudentImage'), studentsControllers.editStudentById);

// Subjects Routes

router.get('/subjects/classesANDteachers' ,subjectsControllers.getClassesAndTeachersList);

router.get('/subjects/:cID' ,subjectsControllers.getClassSubjects);

router.get('/subjects/examSchedule/:cID' ,subjectsControllers.getClassSubjectsExamScedule);

router.post('/subjects/examSchedule/:cID' ,subjectsControllers.updateClassSubjectsExamScedule);

router.post('/subjects/' ,subjectsControllers.addSubjectsToClass);

// Teachers Routes

router.get('/teachers/', teachersControllers.getAllTeachers);

router.get('/teachers/:tID' , teachersControllers.getTeacherById);

router.post('/teachers/' , fileUpload.single('newTeacherImage'), teachersControllers.createNewTeacher);

router.post('/teachers/:tID' , fileUpload.single('newTeacherImage'), teachersControllers.editTeacherById);

// TimeTable Routes

router.get('/timetable/:cID',  timetableControllers.getTimeTable);

router.post('/timetable/',  timetableControllers.updateTimeTable);

module.exports = router;



