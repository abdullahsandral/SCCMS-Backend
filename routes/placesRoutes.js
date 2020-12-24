const express = require('express');
const {check} = require('express-validator');

const placesControllers = require('../controllers/places-controllers');
const fileUpload = require('../middelware/file-upload');
const tokenValidator = require('../middelware/token-validator');

const router = express.Router();

const titleValidator =  check('title').not().isEmpty();
const addressValidator =  check('address').not().isEmpty();
const descriptionValidator =  check('description').isLength({min:5});

const newPlaceValidator = [titleValidator, addressValidator, descriptionValidator]
const updatePlaceValidator = [titleValidator, descriptionValidator]

router.get('/', placesControllers.getAllPlaces);

router.get('/:pID', placesControllers.getPlaceById);

router.get('/user/:uID', placesControllers.getPlacesByUserId);

router.use(tokenValidator);

router.post('/' , fileUpload.single('newPlaceImage'), newPlaceValidator, placesControllers.createNewPlace);

router.patch('/:pID' , updatePlaceValidator ,  placesControllers.updatePlaceById);

router.delete('/:pID' , placesControllers.deletePlaceById);

module.exports = router;