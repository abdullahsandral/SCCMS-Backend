const HttpError = require('../../modals/HTTP-Error');
const Subjects = require('../../modals/subjects-model');
const Classes = require('../../modals/classes-model');
const Teachers = require('../../modals/techers-model');
const ATTENDANCE = require('../../modals/attendance-model');
const db = require('../../config/database-config');
const { where } = require('../../config/database-config');

const getClassSubjects = async (req, res, next) =>
{
    const cID = req.params.cID;
    let classSubjects = await Subjects.findAll({where: { class_id : cID }, include: [Classes, Teachers]})

    setTimeout(()=>res.status(200).json(classSubjects),500)
}

const updateClassSubjects = async (req, res, next) =>
{
    const cID = req.params.cID;
    const { subjects, deletedSubjects } = req.body; 
    try {
        await Subjects.destroy({ where: { id: deletedSubjects } });
    } catch (error) {
        console.log('SUBJECTS COULD NOT BE DELETED.')
    }

    try {
        await Subjects.bulkCreate(subjects,{
            fields:['id','code', 'name', 'teacher_id', 'class_id'] ,
            updateOnDuplicate: ['code', 'name', 'teacher_id']
        })
    } catch (error) {
        console.log('SUBJECTS COULD NOT BE UPDATED', error)
    }
    let classSubjects;
    try {
        classSubjects = await Subjects.findAll({ where: { class_id: cID }})
    } catch (error) {
        
    }
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
exports.updateClassSubjects  = updateClassSubjects;
// exports.getClassSubjectsExamScedule = getClassSubjectsExamScedule;
// exports.addSubjectsToClass  = addSubjectsToClass;