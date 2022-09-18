const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot,Image,Review } = require('../../db/models');
const { ResultWithContext } = require('express-validator/src/chain');


const router = express.Router();

router.get('/',async (req,res)=>{
    const spots = await Spot.findAll()
    res.json({spots});
});

router.get('/current',restoreUser,requireAuth,async (req,res) => {
    const id = req.user.id;
    const user = await User.findByPk(id);
    const spots = await user.getSpots();
    return res.json({spots})
})

router.get('/:spotId',async (req,res) => {
        const id = req.params.spotId;
        const spot = await Spot.scope("getById").findOne({
            where : {id},
            include : [{
                model: Image,
                as: 'SpotImages'
            },{
                model: User,
                as: 'Owner',
                attributes: ["id","firstName","lastName"]
            }]
        })
        if (!spot){
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        res.json({spot})

})

router.get('/:spotId/reviews',async(req,res) => {
        const Reviews = await Review.findAll({
            where:{
                spotId: req.params.spotId
            },
            attributes :['id','userId','spotId','review','stars','createdAt','updatedAt'],
            include: [{
                model: User,
                attributes: ['id','firstName','lastName']
            },
            {
                model: Image,
                as: 'ReviewImages',
                attributes: ['id','url']
            }
        ]

        })

        if(!Reviews.length){
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        return res.json({Reviews})


})

router.post('/',restoreUser,requireAuth,async (req,res) => {
    // try {
        // const ownerId = req.user.id;
        // console.log(req.user.id)
        const{ address,city,state,country,lat,lng,name,description,price } = req.body;
        const spott = await Spot.create({
            ownerId:req.user.id,address,city,state,country,lat,lng,name,description,price
        });
        const spott2 = await Spot.findByPk(spott.id);
        return res.status(201).json(spott2)
    // } catch (e){
    //     res.status(400).json({
    //         message: "Validation Error",
    //         statusCode: 400,
    //         errors: {
    //             city: "City is required",
    //             address: "Street address is required",
    //             country: "Country is required",
    //             state: "State is required",
    //             lng: "Longitude is not valid",
    //             lat: "Latitude is not valid",
    //             description: "Description is required",
    //             price: "Price per day is required",
    //             name: "Name must be less than 50 characters",
    //         }
    //     })
    // }



})

router.post('/:spotId/images',restoreUser,requireAuth,async (req,res) => {
    try{
        const spott3 = await Spot.findByPk(req.params.spotId);
        const { url,previewImage } = req.body
        const newImage = await spott3.createSpotImage({url,previewImage})
        const newImage2 = await Image.findByPk(newImage.id);
        return res.json(newImage2);
    }catch (e){
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

router.post('/:spotId/reviews',restoreUser,requireAuth,async (req,res) => {
        const spot = await Spot.findOne({
            where: {
                id: req.params.spotId,
                ownerId: req.user.id
            }
        })
        if(!spot){
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
    try{
        const review = await Review.create({
            userId: req.user.id,
            spotId: req.params.spotId,
            review: "This was an awesome spot!",
            stars: 5
        })
        return res.status(201).json(review)

    }catch(e){
        res.status(403).json({
            message: "User already has a review for this spot",
            statusCode:404
        })
    }
})

router.put('/:spotId',restoreUser,requireAuth,async (req,res) =>{
    try{
        console.log(req.params.id)
        const {address,city,state,country,lat,lng,name,description,price} = req.body
        let spot = await Spot.findOne({
            where: {
                id: req.params.spotId,
                ownerId: req.user.id
            }
        })
        console.log(spot)
        spot.set({
            address,city,state,country,lat,lng,name,description,price
        })
        spot = await spot.save();
        return res.json(spot);

    }catch (e){
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})
module.exports = router;
