const router = require('express').Router();

const fileUpload = require('../middelware/file-upload');

const notificationsControllers = require('../controllers/shared-controllers/notifications-controllers');
const classesControllers = require('../controllers/shared-controllers/classes-controllers')
const usersControllers = require('../controllers/shared-controllers/users-controllers');

// Notifications Routes

router.get('/notifications',notificationsControllers.getNotifications);

router.get('/notifications/:nID',notificationsControllers.getNotificationById);

router.post('/notifications' ,fileUpload.single('notificationImage'),notificationsControllers.addNotification);

router.post('/notifications/:nID',fileUpload.single('notificationImage') ,notificationsControllers.updateNotification);

// Classes Routes

router.get('/classes',  classesControllers.getAllClasses);

router.get('/classes/:cID',  classesControllers.getOneClass);

// Users Routes

router.get('/allusers',  usersControllers.getAllUsers);

router.post('/signin',  usersControllers.SignIn);


module.exports = router;
