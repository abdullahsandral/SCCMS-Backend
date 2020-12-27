const db = require('../../config/database-config');
const bcrypt = require('bcryptjs');

const Teachers = require('../../modals/techers-model');
const HttpError = require('../../modals/HTTP-Error');

const viewProfile = async (req, res, next) =>
{
    const tID = req.params.tID;
    var teacher;
    try 
    {
        teacher = await Teachers.findOne({where: {id: tID}})
       
    } catch (error) {return next(new HttpError(error))}
    
    setTimeout(() => res.status(200).send(teacher),500)
}

exports.viewProfile = viewProfile;