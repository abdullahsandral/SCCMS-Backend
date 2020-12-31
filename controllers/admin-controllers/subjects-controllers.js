const HttpError = require('../../modals/HTTP-Error');
const Subjects = require('../../modals/subjects-model');
const Classes = require('../../modals/classes-model');
const Teachers = require('../../modals/techers-model');
const ATTENDANCE = require('../../modals/attendance-model');
const db = require('../../config/database-config');

const get1ClassSubjects = async (cID,next) =>
{  
    try {   return await db.query(`SELECT s.id, s.code, s.name, t.id, t.first_name, t.last_name FROM subjects as s INNER JOIN teachers as t on s.id = t.id WHERE s.id = '${cID}' ORDER BY s.id ASC`,
        {type: db.QueryTypes.SELECT})} 
    catch (error) {  return next( new HttpError(error))  }
}

const getClassSubjects = async (req, res, next) =>
{
    const cID = req.params.cID;
    let classSubjects = await Subjects.findAll({where: { class_id : cID }, include: [Classes, Teachers]})

    setTimeout(()=>res.status(200).json(classSubjects),500)
}

const getClassesAndTeachersList = async (req, res, next) =>
{
    let classes,teachers;
    try 
    {
        classes = await Classes.findAll();
    } catch (error) {   return next( new HttpError(error)) };
        
    try 
    {
        teachers = await Teachers.findAll();
    } catch (error) {   return next( new HttpError(error)) };

  setTimeout(()=>  res.status(200).json({classes: classes, teachers: teachers}),500)
        
}

const addSubjectsToClass = async (req, res, next) =>
{
    const {subjects,sClass} = req.body; 
    let existingSubjects;
    try
    {
        existingSubjects = await Subjects.findAll({where:{id:sClass}})
    } catch (error) { return next( new HttpError(error))   }

    if(existingSubjects.length>0)
    {
        let subjects2BeDeleted = existingSubjects.filter( eSubject =>
        {   for(const pSubject of subjects)
            if(pSubject.subjectCode===eSubject.code) return false;
            return true  
        });
        for(const dSubject of subjects2BeDeleted)
        {// Clear Foriegn Key Constraints
            console.log('DELETING ATTENDANCE')
            try { await ATTENDANCE.destroy({where: {id: dSubject.id, id: sClass}})}
            catch (error) { return next( new HttpError(error))   }

            try { await Subjects.destroy({where: {code: dSubject.code, id: sClass}})}
            catch (error) { return next( new HttpError(error))   }
        }
    }

    let subjectCheker;

    for(subject of subjects)
    {
        try 
        {
            subjectCheker = await Subjects.findOne({where:{code: subject.subjectCode}})

            if(!subjectCheker) 
            subjectCheker = await Subjects.create({code: subject.subjectCode, name: subject.subjectName, id: subject.subjectTeacher, id: sClass})
            else
            subjectCheker = Subjects.update({name: subject.subjectName, id: subject.subjectTeacher},
                {where:{code: subject.subjectCode}});
            
            if(!subjectCheker)
            return next( new HttpError("Subjects Could not Be Created OR Updated"));
        
        } catch (error) {   return next( new HttpError(error)) };
    }

    let classSubjects = await get1ClassSubjects(sClass);

    setTimeout(()=>res.status(200).json(classSubjects),500)
}


const get1ClassExamSchedule = async (cID,next) =>
{  
    try {   return await Subjects.findAll( {where: {id:cID}});    } 
    catch (error) {   return next( new HttpError(error)) };
}

const getClassSubjectsExamScedule = async (req, res, next) =>
{
    const cID = req.params.cID;
    let classSubjectsExamScedule = await get1ClassExamSchedule(cID,next);

    setTimeout(()=>res.status(200).json(classSubjectsExamScedule),500)
}

const updateClassSubjectsExamScedule =  async (req, res, next) =>
{
    const {subjects,sClass} = req.body;
    let newSubject;
    console.log(req.body)

    for(subject of subjects)
    {
        try 
        {
            newSubject = await Subjects.update({exam_date: subject.date, exam_start_time: subject.startTime, exam_end_time: subject.endTime},
                {where: {id: subject.sID}})
        
            if(!newSubject) 
            return next( new HttpError("Subjects Could not Be Created"));
        
        } catch (error) {   return next( new HttpError(error)) };
    }

    let classSubjectsExamScedule = await get1ClassExamSchedule(sClass,next);

    setTimeout(()=>res.status(200).json(classSubjectsExamScedule),500)
    }

exports.getClassSubjects  = getClassSubjects;
exports.getClassSubjectsExamScedule = getClassSubjectsExamScedule;
exports.getClassesAndTeachersList = getClassesAndTeachersList;
exports.addSubjectsToClass  = addSubjectsToClass;
exports.updateClassSubjectsExamScedule  = updateClassSubjectsExamScedule;