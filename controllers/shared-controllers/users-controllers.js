const db = require('../../config/database-config');
const bcrypt = require('bcryptjs');

const Students = require('../../modals/students-model');
const Teachers = require('../../modals/techers-model');
const Admins = require('../../modals/admins-model');
const HttpError = require('../../modals/HTTP-Error');

const getAllUsers = async (req, res, next) =>
{
    var allUsers;
    try 
    {console.log('GETTING ALL USERS ')
        allUsers = await db.query(`SELECT ID, First_Name, Contact_Number, 'Teacher' as 'Role'  FROM teachers UNION SELECT ID, First_Name, Contact_Number,  'Student' as 'Role' FROM students ORDER BY 'First_Name' ASC`,
        {type: db.QueryTypes.SELECT})
       
    } catch (error) {return next(new HttpError(error))}

    setTimeout(() => res.status(200).send(allUsers),500)
}

const SignIn = async (req, res, next) =>
{
    const {userName, password, role} = req.body;
    let existingUser;
    try 
    {
        if(role==='Student')
        existingUser = await Students.findOne({where : {E_Mail : userName}});

        else if(role==='Teacher')
        existingUser = await Teachers.findOne({where : {E_Mail : userName}});
        
        else if(role==='Admin')
        existingUser = await Admins.findOne({where : {E_Mail : userName}});
        
        // {res.status(200).json({userRole: role, userId: 'Admin', userImage: 'AdminImage.jpg'}); return}
        else return next(new HttpError("Please enter a valid Role.",404));

        if(!existingUser) 
        return next(new HttpError("Login Failed \nUSER with This Email Doesn't Exist",404));

    } catch (error) { return next(new HttpError(error)) }

    let validPassword = false;
    try
    {
        validPassword = await bcrypt.compare(password, existingUser.Password);
        if(!validPassword)
        return next(new HttpError("Inavalid Credentials",401));

    } catch (error) { return next(new HttpError(error)) }

    const { ID, Image, E_Mail } = existingUser;
    userData = { user_role: role, user_id: ID, user_email: E_Mail, user_image: Image };
   setTimeout(() => res.status(200).json(userData),1000);
}
exports.getAllUsers = getAllUsers;
exports.SignIn = SignIn;