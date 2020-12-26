const jwt = require('jsonwebtoken');

const HttpError = require('../modals/HTTP-Error');

module.exports = (req, res, next) =>
{
    try 
    {     //console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];

        if(!token)
        return next( new HttpError("AUTHENTICATION Failed"));

        const decodedToken = jwt.verify(token, 'Mirza TENSION Baig MUGHAL');

        req.userData = {userId : decodedToken.userId};

        next();
    } catch (error) { return next( new HttpError("AUTHENTICATION Failed due to Header"));}
}