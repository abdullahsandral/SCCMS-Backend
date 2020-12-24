const db = require('../../config/database-config');
const bcrypt = require('bcryptjs');

const Students = require('../../modals/students-model');
const Teachers = require('../../modals/techers-model');

const HttpError = require('../../modals/HTTP-Error');

const getAllUsers = async (req, res, next) =>
{
    var allUsers;
    try 
    {
        allUsers = await db.query('SELECT Teacher_ID, First_Name, Contact_Number,Role FROM teachers UNION SELECT Student_ID, First_Name, Contact_Number, Role FROM students ORDER BY `First_Name` ASC',
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
        existingUser = await Students.findOne({where : {User_Name : userName}});

        else if(role==='Teacher')
        existingUser = await Teachers.findOne({where : {User_Name : userName}});
        
        else if(role==='Admin' && userName==='Sandral@sccms.com' && password==='Sandral')
        
        {res.status(200).json({userRole: role, userId: 'Admin', userImage: 'AdminImage.jpg'}); return}

        else return next(new HttpError("Internal Server Error",500));

        if(!existingUser) 
        return next(new HttpError("Login Failed \nUSER with This Email Doesn't Exist",404));

    } catch (error) { return next(new HttpError(error)) }

    let validPassword = false;
    try
    {console.log('password : ', password)
        validPassword = await bcrypt.compare(password, existingUser.Password);
        console.log(validPassword)
        if(!validPassword)
        return next(new HttpError("Inavalid Credentials",401));

    } catch (error) { return next(new HttpError(error)) }

    const image = existingUser.Student_Image || existingUser.Teacher_Image;
    const id    = existingUser.Student_ID    || existingUser.Teacher_ID;

    userData = {userRole: role, userId: id, userImage: image};
   setTimeout(() => res.status(200).json(userData),2000);
}
exports.getAllUsers = getAllUsers;
exports.SignIn = SignIn;