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

const getTeacherById = async (req, res, next) => 
{
    const teacherId = req.params.tID;
    let teacher;
    try 
    {
        teacher  = await Teachers.findOne({where : { id : teacherId }});

        if(!teacher) return next(new HttpError("Teacher With this id Does't Exist"))

    } catch (error) {   return next(new HttpError(error));    }
    
    setTimeout(() => res.status(200).json(teacher),500)
    
}

const createNewTeacher = async (req , res , next) =>
{
    const {first_name, last_name, father_name, cnic, contact_number, email, gender, permanent_address, mailing_address, date_of_birth, qualification, password } = req.body;

    let createdTeacher;
    try 
    {
        createdTeacher = await Teachers.create(
            {image_url: req.file.filename, first_name, last_name, father_name, cnic, contact_number, email, gender, permanent_address, mailing_address, 
            date_of_birth, qualification})
    
        if(!createdTeacher) 
        return next( new HttpError("Teacher Could not Be Created"));
    
    } catch (error) {   return next( new HttpError(error)) };
    
    let hashedPassword;
    try
    {
        hashedPassword = await bcrypt.hash(password,7);
        if(!hashedPassword) 
        return next( new HttpError("Teacher Created Successfully. Hashing Password Failed"));

    } catch (error) {return next(new HttpError(error))}
    let newUser;
    const teacherId = createdTeacher.dataValues.id;
    try
    {
        newUser = await Users.create({ user_name: email, image_url: req.file.filename, role: 'teacher', user_id: teacherId, password: hashedPassword })
    
        if(!newUser) 
        return next( new HttpError("Student Could not added to user list"));
    
    } catch (error) {   return next( new HttpError(error)) };

    setTimeout(() => res.status(200).json(createdTeacher),500)    
};

const editTeacherById = async (req, res, next) =>
{
    const teacherId = req.params.tID;

    let teacher;
    try 
    {
        teacher  = await Teachers.findOne({where : { id : teacherId }});

        if(!teacher) return next(new HttpError("Teacher With this id Does't Exist"))

    } catch (error) {   return next(new HttpError(error));    }

    const {first_name, last_name, father_name, cnic, contact_number, email, gender, permanent_address, mailing_address, date_of_birth, qualification } = req.body;
    let updatedTeacher, image_url;

    image_url = req.file ? req.file.filename : teacher.image_url
    try 
    {
        updatedTeacher = await Teachers.update(
            {image_url: image_url, first_name, last_name, father_name, cnic, contact_number, email, gender, 
            permanent_address, mailing_address, date_of_birth, qualification},
            { where : { id : teacherId}}
            )

        if(req.file) fileSystem.unlink('uploads/images/'+teacher.image_url, err => console.log(err));
    
    } catch (error) {   return next( new HttpError(error)) };

    setTimeout(() => res.status(200).json(updatedTeacher),500)
    
}

exports.getAllTeachers      = getAllTeachers;
exports.createNewTeacher    = createNewTeacher;
exports.getTeacherById      = getTeacherById;
exports.editTeacherById     = editTeacherById;