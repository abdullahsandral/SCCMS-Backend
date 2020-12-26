const fileSystem    = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../../config/database-config');

const HttpError = require('../../modals/HTTP-Error');
const Students = require('../../modals/students-model');
const Classes = require('../../modals/classes-model');

const getAllStudents = async (req, res, next) => 
{
    let allStudents;
    try 
    {
        allStudents  = await db.query('SELECT s.ID, s.Roll_Number, s.First_Name, s.Last_Name, s.E_Mail,s.Contact_Number, c.Class_Name FROM `students` as s INNER JOIN classes as c on c.Class_ID=s.Class_ID ORDER BY `s`.`ID` ASC',
        {type: db.QueryTypes.SELECT})

    } catch (error) {   return next(new HttpError(error));    }
    
    setTimeout(() => res.status(200).json(allStudents),500)
};

const createNewStudent = async (req , res , next) =>
{
    const {rollNo, firstName, lastName, fatherName, CNIC, sContact, pContact, email, gender, pAddress, mAddress, DOB, userName, password, classID } = req.body;
    
    let hashedPassword;
    try 
    {
        hashedPassword = await bcrypt.hash(password,7);
        if(!hashedPassword) 
        return next( new HttpError("SignUp Failed due to Password Hashing"));

    } catch (error) {return next(new HttpError(error))}
    
    let createdStudent;
    try 
    {
        createdStudent = await Students.create(
            {Roll_Number : rollNo, Student_Image: req.file.filename, First_Name : firstName, Last_Name : lastName, Father_Name: fatherName, 
            CNIC_Number: CNIC, Contact_Number: sContact, Father_Contact: pContact, E_Mail: email, Gender: gender, 
            Permanent_Address: pAddress, Mailing_Address: mAddress, Date_Of_Birth: DOB, User_Name: userName+'@sccms.com', Password: hashedPassword, Class_ID: classID
            })
    
        if(!createdStudent) 
        return next( new HttpError("Student Could not Be Created"));
    
    } catch (error) {   return next( new HttpError(error)) };

    setTimeout(() => res.status(200).json(createdStudent),500)
};

const getStudentById = async (req, res, next) => 
{
    const studentId = req.params.sID;
    let student;
    try 
    {
        student  = await Students.findOne({where : {ID : studentId}});

        if(!student) return next(new HttpError("Student With this ID Does't Exist"))

    } catch (error) {   return next(new HttpError(error));    }
    
    setTimeout(() => res.status(200).json(student),500)
}

const editStudentById = async (req, res, next) =>
{
    const studentId = req.params.sID;

    let student;
    try 
    {
        student  = await Students.findOne({where : {ID : studentId}});

        if(!student) return next(new HttpError("Student With this ID Does't Exist"))

    } catch (error) {   return next(new HttpError(error));    }

    const {rollNo, firstName, lastName, fatherName, CNIC, sContact, pContact, email, gender, pAddress, mAddress, DOB, userName, password ,classID } = req.body;
    let updatedStudent, image;

    let hashedPassword;
    if(password) try 
    {
        hashedPassword = await bcrypt.hash(password,7);
        if(!hashedPassword) 
        return next( new HttpError("SignUp Failed due to Password Hashing"));

    } catch (error) {return next(new HttpError(error))}

    if(req.file)  image = req.file.filename; else image = student.Student_Image;
    try 
    {
        updatedStudent = await Students.update(
            {Roll_Number : rollNo, Student_Image: image, First_Name : firstName, Last_Name : lastName, Father_Name: fatherName, 
            CNIC_Number: CNIC, Contact_Number: sContact, Father_Contact: pContact, E_Mail: email, Gender: gender, Permanent_Address: pAddress, 
            Mailing_Address: mAddress, Date_Of_Birth: DOB, User_Name: userName+'@sccms.com', Class_ID: classID
            },{ where : { ID : studentId}})
            
        if(password)  await Students.update({ Password: hashedPassword},{ where : { ID : studentId}})
    
        if(updatedStudent<=0) 
        return next( new HttpError("Student Could not Be Updated"));

        if(req.file) fileSystem.unlink('uploads/images/'+student.Student_Image, err => console.log(err));
    
    } catch (error) {   return next( new HttpError(error)) };

    setTimeout(() => res.status(200).json(updatedStudent),500)
}

exports.getAllStudents      = getAllStudents;
exports.createNewStudent    = createNewStudent;
exports.getStudentById      = getStudentById;
exports.editStudentById     = editStudentById;