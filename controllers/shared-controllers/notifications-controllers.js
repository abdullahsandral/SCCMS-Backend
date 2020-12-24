const HttpError = require('../../modals/HTTP-Error');
const Notifications = require('../../modals/notifications-model');

const getNotifications = async (req, res, next) =>
{
    let notifications ;
    try 
        {
            notifications = await Notifications.findAll();
        } catch (error) {   return next( new HttpError(error)) };
    

    setTimeout(()=>res.status(200).json(notifications),500)
}

const getNotificationById = async (req, res, next) =>
{
    const nID = req.params.nID;
    let notification ;
    try 
        {
            notification = await Notifications.findOne({where: {Notification_ID: nID}});
        } catch (error) {   return next( new HttpError(error)) };
    

    setTimeout(()=>res.status(200).json(notification),500)
}

const addNotification = async (req, res, next) =>
{
    const {creatorName,subject,description} = req.body; 
    let newNotification, image;
    
    if(req.file)  image = req.file.filename; else image = null;
    console.log(image)
    try 
        {
            newNotification = await Notifications.create({Creator_Name: creatorName, Notification_Subject: subject, Description: description, Notification_Image: image })
        
            if(!newNotification) 
            return next( new HttpError("Subjects Could not Be Created"));
        
        } catch (error) {   return next( new HttpError(error)) };

    res.status(200).json(newNotification);
}

const updateNotification =  async (req, res, next) =>
{
    const nID = req.params.nID;
    const {subject,description} = req.body; 

    let notification;
    try 
    {
        notification  = await Notifications.findOne({where : {Notification_ID : nID}});

        if(!notification) return next(new HttpError("Notification With this ID Does't Exist"))

    } catch (error) {   return next(new HttpError(error));    }

    let updatedNotification,image;

    if(req.file)  image = req.file.filename; else image = notification.Notification_Image;

        try 
        {
            updatedNotification = await Notifications.update({Notification_Subject: subject, Description: description, Notification_Image: image},{where:{Notification_ID: nID}})
        
            if(!updatedNotification) 
            return next( new HttpError("Notification Could not Be Updated"));
        
        } catch (error) {   return next( new HttpError(error)) };

    res.status(200).json(updatedNotification);
}

exports.getNotifications  = getNotifications;
exports.getNotificationById  = getNotificationById;
exports.addNotification = addNotification;
exports.updateNotification  = updateNotification;