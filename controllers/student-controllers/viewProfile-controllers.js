const db = require('../../config/database-config');
const bcrypt = require('bcryptjs');

const Students = require('../../modals/students-model');
const HttpError = require('../../modals/HTTP-Error');

const viewProfile = async (req, res, next) =>
{
    const sID = req.params.sID;
    var student;
    try 
    {
        student = await db.query(`SELECT * FROM students as s INNER JOIN classes as c on c.id=s.id WHERE s.id = '${sID}' `,
        {type: db.QueryTypes.SELECT})
       
    } catch (error) {return next(new HttpError(error))}
    
    setTimeout(() => res.status(200).send(student),500)
}

exports.viewProfile = viewProfile;