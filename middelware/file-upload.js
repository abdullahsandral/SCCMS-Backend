const Multer = require('multer');
const uuid = require('uuid/v4');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

const MIME_TYPE_MAP = {
    'image/jpg'  : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png'  : 'png',
}

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'user-places',
//       allowedFormats: ["jpg", "jpeg", "png"],
//     },
//   });

const fileUpload = Multer(
    {
        limits : 5000000,
        storage : Multer.diskStorage(
        {
            destination : (req, file, cb) => 
            {console.log("IN MULTER")
                cb(null, 'uploads/images');
            },
            filename : (req, file, cb) =>  
            { 
                const imageExtension = MIME_TYPE_MAP[file.mimetype];
               
                cb(null, uuid()+'.'+imageExtension);
            }  
        }
        ),
        fileFilter : (req, file, cb) =>
        {
            const validImage = !!MIME_TYPE_MAP[file.mimetype];
            const error = validImage ? null : new Error("Invalid Image Mime Type");
            cb(error, validImage);
        }
    }
);

module.exports = fileUpload;