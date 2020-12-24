const fileSystem    = require('fs');
const bcrypt = require('bcryptjs');

const Users = require('../../modals/users-model');
const HttpError = require('../../modals/HTTP-Error');
const Teachers = require('../../modals/techers-model');

const getAllTeachers = async (req, res, next) => 
{
    let allTeachers;
    try 
    {
        allTeachers  = await Teachers.findAll();
    } catch (error) {   return next(new HttpError(error));    }
    
    setTimeout(() => res.status(200).json(allTeachers),500)
};

const createNewTeacher = async (req , res , next) =>
{
    const {firstName, lastName, fatherName, CNIC, Contact, email, gender, pAddress, mAddress, DOB, qualification, userName, password } = req.body;
       
    let hashedPassword;
    try 
    {
        hashedPassword = await bcrypt.hash(password,7);
        if(!hashedPassword) 
        return next( new HttpError("SignUp Failed due to Password Hashing"));
    } catch (error) {return next(new HttpError(error))}

    let createdTeacher;
    try 
    {
        createdTeacher = await Teachers.create(
            {Teacher_Image: req.file.filename, First_Name : firstName, Last_Name : lastName, Father_Name: fatherName, CNIC_Number: CNIC, 
            Contact_Number: Contact, E_Mail: email, Gender: gender, Permanent_Address: pAddress, Mailing_Address: mAddress, Date_Of_Birth: DOB, 
            Qualification: qualification, User_Name: userName, Password: hashedPassword
            })
    
        if(!createdTeacher) 
        return next( new HttpError("Teacher Could not Be Created"));
    
    } catch (error) {   return next( new HttpError(error)) };
   
    setTimeout(() => res.status(200).json(createdTeacher),500)    
};

const getTeacherById = async (req, res, next) => 
{
    const teacherId = req.params.tID;
    let teacher;
    try 
    {
        teacher  = await Teachers.findOne({where : {Teacher_ID : teacherId}});

        if(!teacher) return next(new HttpError("Teacher With this ID Does't Exist"))

    } catch (error) {   return next(new HttpError(error));    }
    
    setTimeout(() => res.status(200).json(teacher),500)
    
}

const editTeacherById = async (req, res, next) =>
{
    const teacherId = req.params.tID;

    let teacher;
    try 
    {
        teacher  = await Teachers.findOne({where : {Teacher_ID : teacherId}});

        if(!teacher) return next(new HttpError("Teacher With this ID Does't Exist"))

    } catch (error) {   return next(new HttpError(error));    }

    const {firstName, lastName, fatherName, CNIC, Contact,  email, gender, pAddress, mAddress, DOB, qualification,  userName, password } = req.body;
    let updatedTeacher, image;

    let hashedPassword;
    if(password) try 
    {
        hashedPassword = await bcrypt.hash(password,7);
        if(!hashedPassword) 
        return next( new HttpError("SignUp Failed due to Password Hashing"));

    } catch (error) {return next(new HttpError(error))}

    if(req.file)  {console.log("NEW IMAGE :"); image = req.file.filename;} else {console.log("OLD IMAGE :"); image = teacher.Teacher_Image;}
    try 
    {
        updatedTeacher = await Teachers.update(
            {Teacher_Image: image, First_Name : firstName, Last_Name : lastName, Father_Name: fatherName, CNIC_Number: CNIC, 
                Contact_Number: Contact, E_Mail: email, Gender: gender, Permanent_Address: pAddress, Mailing_Address: mAddress,
                Date_Of_Birth: DOB, Qualification: qualification,User_Name: userName+'@sccms.com',
            },{ where : { Teacher_ID : teacherId}})
        if(password)  await Teachers.update({ Password: hashedPassword},{ where : { Teacher_ID : teacherId}})
        if(req.file) fileSystem.unlink('uploads/images/'+teacher.Teacher_Image, err => console.log(err));
    
    } catch (error) {   return next( new HttpError(error)) };

    setTimeout(() => res.status(200).json(updatedTeacher),500)
    
}

exports.getAllTeachers      = getAllTeachers;
exports.createNewTeacher    = createNewTeacher;
exports.getTeacherById      = getTeacherById;
exports.editTeacherById     = editTeacherById;