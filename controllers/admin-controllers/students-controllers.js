const fileSystem    = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../../config/database-config');

const HttpError = require('../../modals/HTTP-Error');
const Students = require('../../modals/students-model');
const Classes = require('../../modals/classes-model');
const Users = require('../../modals/users-model');

const getAllStudents = async (req, res, next) => 
{
    let allStudents;
    try 
    {
        // allStudents  = await db.query('SELECT s.id, s.Roll_Number, s.first_name, s.last_name, s.email,s.contact_number, c.Class_Name FROM `students` as s INNER JOIN classes as c on c.id=s.id ORDER BY `s`.`id` ASC',
        // {type: db.QueryTypes.SELECT})
        allStudents = Students.findAll({include: Classes})

    } catch (error) {   return next(new HttpError(error));    }
    
    setTimeout(() => res.status(200).json(allStudents),500)
};

const getStudentById = async (req, res, next) => 
{
    const studentId = req.params.sID;
    let student;
    try 
    {
        student  = await Students.findOne({where : {id : studentId}});

        if(!student) return next(new HttpError("Student With this id Does't Exist"))

    } catch (error) {   return next(new HttpError(error));    }
    
    setTimeout(() => res.status(200).json(student),500)
}

const createNewStudent = async (req , res , next) =>
{
    const {roll_no, first_name, last_name, father_name, cnic, contact_number, father_contact_number, email, gender, permanent_address, mailing_address, date_of_birth, class_id, password } = req.body;
    let createdStudent;
    try 
    {
        createdStudent = await Students.create(
            { roll_no, image_url: req.file.filename, first_name, last_name, father_name, cnic, contact_number, father_contact_number, email, gender, 
            permanent_address, mailing_address, date_of_birth, class_id })
    
        if(!createdStudent) 
        return next( new HttpError("Student Could not Be Created"));
    
    } catch (error) {   return next( new HttpError(error)) };
    let hashedPassword;
    try
    {
        hashedPassword = await bcrypt.hash(password,7);
        if(!hashedPassword) 
        return next( new HttpError("Student Created Successfully. Hashing Password Failed"));

    } catch (error) {return next(new HttpError(error))}
    let newUser;
    const studentId = createdStudent.dataValues.id;
    try
    {
        newUser = await Users.create(
            { user_name: email, image_url: req.file.filename, role: 'student', user_id: studentId, password: hashedPassword })
    
        if(!newUser) 
        return next( new HttpError("Student Could not added to user list"));
    
    } catch (error) {   return next( new HttpError(error)) };

    setTimeout(() => res.status(200).json(createdStudent),500)
};

const editStudentById = async (req, res, next) =>
{
    const studentId = req.params.sID;
    let student;
    try 
    {
        student  = await Students.findOne({where : { id : studentId }});

        if(!student) return next(new HttpError("Student With this id Does't Exist"))

    } catch (error) {   return next(new HttpError(error));    }

    const {roll_no, first_name, last_name, father_name, cnic, contact_number, father_contact_number, email, gender, permanent_address, mailing_address, date_of_birth, class_id } = req.body;
    let updatedStudent, image_url;

    image_url = req.file ? req.file.filename : student.image_url;
    try
    {
        updatedStudent = await Students.update(
            { roll_no, image_url, first_name, last_name, father_name, cnic, contact_number, father_contact_number, email, gender, 
            permanent_address, mailing_address, date_of_birth, class_id },
            { where : { id : studentId}})

        if(updatedStudent<=0) 
        return next( new HttpError("Student Could not Be Updated"));

        if(req.file) fileSystem.unlink('uploads/images/'+student.image_url, err => console.log(err));
    
    } catch (error) {   return next( new HttpError(error)) };

    setTimeout(() => res.status(200).json(updatedStudent),500)
}

exports.getAllStudents      = getAllStudents;
exports.createNewStudent    = createNewStudent;
exports.getStudentById      = getStudentById;
exports.editStudentById     = editStudentById;