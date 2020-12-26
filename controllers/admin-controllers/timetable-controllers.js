const TimeTable = require('../../modals/timetable-model');
const Subjects = require('../../modals/subjects-model');
const HttpError = require('../../modals/HTTP-Error');

const getClassTTandSUBJECTS = async (cID,next) =>
{
    let classTimeTable, classSubjects;
    try {   classTimeTable = await TimeTable.findAll({where: {Class_ID : cID}}); } 
    catch (error) {return next(new HttpError(error))}

    try {   classSubjects = await Subjects.findAll({where: {Class_ID : cID}},); } 
    catch (error) {return next(new HttpError(error))}

    return await {classTimeTable: classTimeTable, classSubjects: classSubjects}
}

const getTimeTable = async (req, res, next) =>
{
    const cID = req.params.cID;
    console.log(cID)

    const classTTandSubjects = await getClassTTandSUBJECTS(cID,next)

    setTimeout(() => res.status(200).json(classTTandSubjects),500)
}

const updateTimeTable = async (req, res, next) =>
{
    const {timetable,sClass} = req.body;
    let dayTTable;

    try 
    {
        await TimeTable.destroy({where:{Class_ID:sClass}})
    } catch (error) { return next( new HttpError(error))   }

    for(oneDay of timetable)
    {
        const {dayName, lec1, lec2, lec3, lec4, lec5, lec6, lec7} = oneDay;
        try 
        {
            dayTTable = await TimeTable.create({Day_Name: dayName, Lec_1: lec1, Lec_2: lec2, Lec_3: lec3, Lec_4: lec4, Lec_5: lec5, Lec_6: lec6, Lec_7: lec7, Class_ID: sClass})
        
            if(!dayTTable) 
            return next( new HttpError("Subjects Could not Be Created"));
        
        } catch (error) {   return next( new HttpError(error)) };
    }

    const classTTandSubjects = await getClassTTandSUBJECTS(sClass,next)

    setTimeout(() => res.status(200).json(classTTandSubjects),500)
}

exports.getTimeTable = getTimeTable;
exports.updateTimeTable = updateTimeTable;