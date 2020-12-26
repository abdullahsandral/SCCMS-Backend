const db = require('../../config/database-config');
const bcrypt = require('bcryptjs');

const Attendance = require('../../modals/attendance-model');
const Subjects = require('../../modals/subjects-model');
const Students = require('../../modals/students-model');
const HttpError = require('../../modals/HTTP-Error');

const getAttendance = async (req, res, next) =>
{
    const sID = req.params.sID;
    var student;
    try 
    {
        student = await Students.findOne({where: {ID: sID}});

        if(!student) return next(new HttpError("No Student Exist with This ID"));
        // student = await db.query(`SELECT * FROM students as s INNER JOIN classes as c on c.Class_ID=s.Class_ID WHERE s.ID = '${sID}' `,
        // {type: db.QueryTypes.SELECT})
       
    } catch (error) {return next(new HttpError(error))}
    let subjects
    try 
    {
        subjects = await Subjects.findAll({where: {Class_ID: student.Class_ID},order:[['Subject_Name', 'ASC']]});

        // if(!subjects) return next(new HttpError("No Subject Exist Against This Student"));
       
    } catch (error) {return next(new HttpError(error))}
    let attendance;
    try 
    {
        attendance = await Attendance.findAll({where: {Class_ID: student.Class_ID, ID: student.ID},
            order:[['Attendance_Date', 'ASC']]});

        if(!attendance) return next(new HttpError("No Subject Exist Against This Student"));
       
    } catch (error) {return next(new HttpError(error))}

    setTimeout(() => res.status(200).send({subjects: subjects, attendance: attendance}),500)
}

exports.getAttendance = getAttendance;