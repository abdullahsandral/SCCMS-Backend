const HttpError = require('../../modals/HTTP-Error');
const Notifications = require('../../modals/notifications-model');
const Users = require('../../modals/users-model');

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
            notification = await Notifications.findOne({where: {id: nID}});
        } catch (error) {   return next( new HttpError(error)) };
    

    setTimeout(()=>res.status(200).json(notification),500)
}

const addNotification = async (req, res, next) =>
{
    const { creator_id, creator_role, subject, description } = req.body;
    let user;
    try 
        {
            user = await Users.findOne({ where: { role: creator_role, user_id: creator_id }})
            if(!user)
            return next( new HttpError("Invlid User"));
        
        } catch (error) {   return next( new HttpError(error)) };

    let newNotification, image_url;
    if(req.file)  image_url = req.file.filename; else image_url = null;
    try 
        {
            newNotification = await Notifications.create({ subject, description, image_url, creator_id: user.dataValues.id })
        
            if(!newNotification) 
            return next( new HttpError("Notifiction Could not Be Created"));
        
        } catch (error) {   return next( new HttpError(error)) };

    res.status(200).json(newNotification);
}

const updateNotification =  async (req, res, next) =>
{
    const nID = req.params.nID;
    const { subject, description } = req.body; 

    let notification;
    try 
    {
        notification  = await Notifications.findOne({where : {id : nID}});

        if(!notification) return next(new HttpError("Notification With this id Does't Exist"))

    } catch (error) {   return next(new HttpError(error));    }

    let updatedNotification,image_url;

    if(req.file)  image_url = req.file.filename; else image_url = notification.Notification_Image;

        try 
        {
            updatedNotification = await Notifications.update({ subject, description, image_url }, { where:{ id: nID }})
            if(!updatedNotification)
            return next( new HttpError("Notification Could not Be Updated"));
        
        } catch (error) {   return next( new HttpError(error)) };

    res.status(200).json({message: 'Notification updated successfully.'});
}

exports.getNotifications  = getNotifications;
exports.getNotificationById  = getNotificationById;
exports.addNotification = addNotification;
exports.updateNotification  = updateNotification;