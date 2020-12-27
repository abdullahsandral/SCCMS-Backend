const db = require('../../config/database-config');
const bcrypt = require('bcryptjs');

const Teachers = require('../../modals/techers-model');
const Subjects = require('../../modals/subjects-model');
const Students = require('../../modals/students-model');
const Classes = require('../../modals/classes-model');
const Attendance = require('../../modals/attendance-model');
const HttpError = require('../../modals/HTTP-Error');

const getTeacherSubjects= async (req, res, next) =>
{
    const tID = req.params.tID;
    let teacherSubjects;
    try 
    {
        teacherSubjects = await Subjects.findAll({where: {id: tID}})
       
    } catch (error) {return next(new HttpError(error))}
    let allStudents;
    try 
    {  
        allStudents = await Students.findAll()
       
    } catch (error) {return next(new HttpError(error))}

    let allClasses;
    try 
    {
        allClasses = await Classes.findAll()
       
    } catch (error) {return next(new HttpError(error))}

    setTimeout(() => res.status(200).send({classes: allClasses,students: allStudents, subjects: teacherSubjects}),500)
}

const getSubjectAttendance= async (req, res, next) =>
{
  const {classID,subjectID,date} = req.body;
  console.log(req.body)
    let attendanceData;
    try 
        { 
            attendanceData = await Attendance.findAll({where: {Attendance_Date: date, id: classID, id: subjectID}})
       
        } catch (error) {return next(new HttpError(error))}
    
    setTimeout(() => res.status(200).json(attendanceData),500)
}

const markSubjectAttendance= async (req, res, next) =>
{
  const {classID,subjectID,date,attendanceData} = req.body;

   for(const oneRow of attendanceData)
   {   
       try 
        { await Attendance.create({Attendance_Status: oneRow.attendanceStatus, Attendance_Date: date,
            id: classID, id:oneRow.studentID, id: subjectID})
       
        } catch (error) {return next(new HttpError(error))}
   }
    
    setTimeout(() => res.status(200).json({}),500)
}

const updateSubjectAttendance= async (req, res, next) =>
{
  const {classID,subjectID,date,attendanceData} = req.body;

   for(const oneRow of attendanceData)
   {   
       try 
        { await Attendance.update({Attendance_Status: oneRow.attendanceStatus},
        {where: {Attendance_Date: date, id: classID, id:oneRow.studentID, id: subjectID}} )
       
        } catch (error) {return next(new HttpError(error))}
   }
    
    setTimeout(() => res.status(200).json({}),500)
}

exports.getTeacherSubjects = getTeacherSubjects;
exports.getSubjectAttendance = getSubjectAttendance;
exports.updateSubjectAttendance = updateSubjectAttendance;
exports.markSubjectAttendance = markSubjectAttendance;