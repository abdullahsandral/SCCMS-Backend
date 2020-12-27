const db = require('../../config/database-config');
const bcrypt = require('bcryptjs');

const Students = require('../../modals/students-model');
const Teachers = require('../../modals/techers-model');
const Admins = require('../../modals/admins-model');
const Users = require('../../modals/users-model');
const HttpError = require('../../modals/HTTP-Error');

const getAllUsers = async (req, res, next) =>
{
    var allUsers;
    try 
    {
       allUsers = await Users.findAll();
    } catch (error) {return next(new HttpError(error))}
    setTimeout(() => res.status(200).json(allUsers),500)
}

const SignIn = async (req, res, next) =>
{
    const {user_name: userName, password, role: user_role} = req.body;
    let existingUser;
    try 
    {
        existingUser = await Users.findOne({where : {user_name: userName , role: user_role }})

        if(!existingUser)
        return next(new HttpError("Login Failed \nUSER with This Email and role Doesn't Exist",404));

    } catch (error) { return next(new HttpError(error)) }

    let validPassword = false;
    try
    {
        validPassword = await bcrypt.compare(password, existingUser.password);
        if(!validPassword)
        return next(new HttpError("Inavalid Credentials",401));

    } catch (error) { return next(new HttpError(error)) }

    const { user_id, image_url, user_name, role } = existingUser;
    userData = { user_id, image_url, user_name, role };
   setTimeout(() => res.status(200).json(userData),1000);
}
exports.getAllUsers = getAllUsers;
exports.SignIn = SignIn;