const db = require('../../config/database-config');
const bcrypt = require('bcryptjs');

const Classes = require('../../modals/classes-model');
const HttpError = require('../../modals/HTTP-Error');

const getAllClasses = async (req, res, next) =>
{
    var allClasses;
    try 
    {
        allClasses = await Classes.findAll();
       console.log(allClasses)
    } catch (error) {return next(new HttpError(error))}
  
    setTimeout(() => res.status(200).send(allClasses),500)
}

const getOneClass = async (req, res, next) =>
{
    const cID = req.params.cID;
    let oneClass;
    try 
    {
        oneClass = await Classes.findOne({where: {Class_ID: cID}});
       
    } catch (error) {return next(new HttpError(error))}
  
    setTimeout(() => res.status(200).send(oneClass),500)
}
exports.getAllClasses = getAllClasses;
exports.getOneClass = getOneClass;