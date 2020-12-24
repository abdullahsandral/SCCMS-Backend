const fileSystem    = require('fs');
const {validationResult} = require('express-validator');

const HttpError = require('../modals/HTTP-Error');
const Places = require('../modals/placess-model');
const Users = require('../modals/users-model');

const getAllPlaces = async (req, res, next) => 
{
    let allPlaces;
    try 
    {
        allPlaces  = await Places.findAll();

        // if(allPlaces.length<=0)
        // return next(new HttpError("No Place Exxist Aganist Any User",404));

    } catch (error) {   return next(new HttpError(error));    }
    
    res.status(200).json(allPlaces);
};

const getPlaceById = async (req, res, next) => 
{
    const pid = req.params.pID;
    let place;
    try 
    {
        place = await Places.findOne({where : {P_ID : pid}});

        if(!place) 
        return next( new HttpError("Place with this ID Does Not Exist", 404));
    
    } catch (error) {   return next( new HttpError(error)) };

    setTimeout( ()=>{res.status(200).json(place)},1000) ;
};

const getPlacesByUserId = async (req, res, next) => 
{
    const uid = req.params.uID;
    let userPlaces;
    try 
    {
        userPlaces = await Places.findAll({where : {userUID : uid}});

        if(userPlaces<=0) 
        return next( new HttpError("Places against this USER ID Do Not Exist",404));

    } catch (error) {   return next( new HttpError(error)) };

    res.status(200).json({Places: userPlaces});
};

const updatePlaceById = async (req , res , next) =>
{
    const validationError = validationResult(req);
    if(!validationError.isEmpty()) return next( new HttpError('All Inputs are Not Valid. Please Check your Inputs',422))
   
    const pid = req.params.pID;

    let place2BeUpdated;
    try 
    {
        place2BeUpdated = await Places.findOne({where : {P_ID : pid}})

        if(!place2BeUpdated) 
        return next( new HttpError("Place with this ID Does Not Exist", 404));

    } catch (error) {   return next( new HttpError(error)) };

    const {title, description } = req.body;
    let updatedPlace//,rowsUpdated;
    try 
    {
        updatedPlace = await Places.update({ P_Title : title , P_Description : description} , { where : { P_ID : pid}});

        if(updatedPlace<=0)
        return next( new HttpError("Sorry Place Could not be Updated"));

    } catch (error) {   return next( new HttpError(error)) };

    setTimeout( ()=>{res.status(200).json(updatedPlace)},1000);
};

const createNewPlace = async (req , res , next) =>
{
    const validationError = validationResult(req);
    if(!validationError.isEmpty()) return next( new HttpError('All Inputs are Not Valid. Please Check your Inputs',422))
   
    const {title, address, description, creator, } = req.body;
    let createdPlace;
    try 
    {
        createdPlace = await Places.create({P_Title : title, P_Address : address, P_Description : description, P_Image: req.file.path, userUID: creator,})
    
        if(!createdPlace) 
        return next( new HttpError("Place Could not Be Created"));
    
    } catch (error) {   return next( new HttpError(error)) };

    let userPlaces,userPlacesCount;
    try 
    {
        userPlaces = await Places.findAll({where : {userUID : creator}})
        
        userPlacesCount = userPlaces.length;
        console.log("AFTER CREATING USEER PLACES : " + userPlacesCount)
    
    } catch (error) {   return next( new HttpError(error)) };

    let totalPlaces;
    try 
    {
        totalPlaces = await Users.update({ U_Places : userPlacesCount },{ where : {U_ID : creator} });
           
    } catch (error) {   return next( new HttpError(error)) };
        
    res.status(200).json(createdPlace);
};

const deletePlaceById = async (req , res , next) =>
{
    var pid = req.params.pID;
    let place2BeDeleted,userID,placeImage;
    try 
    {
        place2BeDeleted = await Places.findOne({where : {P_ID : pid}});

        if(!place2BeDeleted) 
        return next( new HttpError("Place with this ID Does Not Exist", 404));

        userID = place2BeDeleted.userUID;
        placeImage = place2BeDeleted.P_Image;

    } catch (error) {   return next( new HttpError(error)) };
    
    let deletedPlaces;
    try
    {
        deletedPlaces = await Places.destroy({where : {P_ID : pid}});

        if(deletedPlaces <= 0)
        return next( new HttpError("Failed : No Place Could be Deleted"));

        // fileSystem.unlink('uploads/images/'+placeImage, err => console.log(err));

    } catch (error) {   return next( new HttpError(error)) };

    let userPlaces,userPlacesCount;
    try 
    {
        userPlaces = await Places.findAll({where : {userUID : userID}})
        
        userPlacesCount = userPlaces.length;
        console.log("AFTER DELETING USER PLACES : " + userPlacesCount)

    } catch (error) {   return next( new HttpError(error)) };

    let totalPlaces;
    try 
    {
        totalPlaces = await Users.update({U_Places : userPlacesCount},{where : {U_ID : userID}});
           
    } catch (error) {   return next( new HttpError(error)) };

    res.status(200).json("Total Places : " + totalPlaces);
    
};

exports.getAllPlaces        = getAllPlaces;
exports.getPlaceById        = getPlaceById;
exports.getPlacesByUserId   = getPlacesByUserId;
exports.createNewPlace      = createNewPlace;
exports.updatePlaceById     = updatePlaceById;
exports.deletePlaceById     = deletePlaceById;