const express       = require('express');
const bodyParser    = require('body-parser');
const fileSystem    = require('fs');
const cloudinary = require('cloudinary').v2;
const path          = require('path');
const cors          = require('cors');
const bcrypt        = require('bcryptjs')

const adminRoutes = require('./routes/adminRoutes');
const sharedRoutes = require('./routes/sharedRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');


const db = require('./config/database-config');
const HttpError = require('./modals/HTTP-Error');

const app = express();

// (async () => 
// {
//     console.log(await bcrypt.hash('password',7))
// })();

app.use(cors());

try
{   db.authenticate() 
    .then(()=> console.log('Database Connected...'))
} catch (error) {   console.dir(error) }
 
// cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME, 
//     api_key: process.env.CLOUD_API_KEY, 
//     api_secret: process.env.CLOUD_API_SECRET 
//   });


app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads','images')))

app.use('/api/admin', adminRoutes)

app.use('/api/shared', sharedRoutes)

app.use('/api/student', studentRoutes);

app.use('/api/teacher', teacherRoutes);

app.use((req, res, next) =>
{
    next(new HttpError("This Route DoesNot Exist on SERVER", 404));
})

app.use((error , req , res , next) =>
{
    // if(req.file)  { fileSystem.unlink(req.file.path, err => console.log(err)); }  
    
    console.dir("IN ERROR : ")
    console.dir(error)
    
    if(res.headerSent)  return next(error);
    res.status(error.code || 500)
    res.json({errorMsg : error.message || "An UNKONOWN Error Has Occured", errorCode: error.code || 500});
});

app.listen(process.env.PORT || 5000);