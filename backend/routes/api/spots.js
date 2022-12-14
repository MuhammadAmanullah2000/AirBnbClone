const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot,Image,Review,Booking } = require('../../db/models');
const { ResultWithContext } = require('express-validator/src/chain');


const router = express.Router();

router.get('/',async (req,res)=>{
    let { page, size } = req.query;
    let limit, offset;
     if(!page && !size){
        const Spots = await Spot.findAll()
        return res.json({Spots});
     }
     page = Number(page);
     size = Number(size);
     if(page >= 1 && size >= 1){
        limit = size;
        offset = size * (page -1)
     }
    const Spots = await Spot.findAll({
        limit : size,
        offset : size * (page -1)
    })
    return res.json({Spots,page,size});
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

router.get('/:spotId/bookings',restoreUser,requireAuth,async(req,res)=>{

    const spot2 = await Spot.findAll({
        where: {
            id: req.params.spotId
        }
    })

    if(!spot2.length){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    const Bookings = await Booking.findAll({
        where:{
            spotId: req.params.spotId,
            userId:req.user.id
        },
        attributes: ['id','spotId','userId','startDate','endDate','createdAt','updatedAt'],
        inlcude:{
            moodel: User,
            attributes: ['id','firstName','lastName']
        }
    })
    if(!Bookings){

        const Bookings2 = await Booking.findAll({
            where:{
                spotId: req.params.spotId
            },
            attributes: ['spotId','startDate','endDate']
        })
        return res.json({Bookings2})
    }
    return res.json({Bookings})
})

router.post('/',restoreUser,requireAuth,async (req,res) => {
    // try {
        // const ownerId = req.user.id;
        // console.log(req.user.id)
        const{ address,city,state,country,lat,lng,name,description,price,avgRating,previewImage,image } = req.body;
        const spott = await Spot.create({
            ownerId:req.user.id,address,city,state,country,lat,lng,name,description,price,avgRating,previewImage,image
        });
        const spott2 = await Spot.findOne({
            where: {
                id: spott.id
            },
            attributes: ['id','ownerId','address','city','state','country','lat','lng','name','description','price','avgRating','previewImage','image','createdAt','updatedAt']
        });
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
        let spott3 = await Spot.findByPk(req.params.spotId);
        const { url,previewImage } = req.body
        const newImage = await spott3.createSpotImage({url,previewImage})
        const newImage2 = await Image.findByPk(newImage.id);
        if(previewImage){
            const spotRows = await Spot.update(
                {
                    previewImage:url
                },
                {
                    where: { id: req.params.spotId },
                }
                );

            }
        // await Spot.upsert({
        //     id: req.params.spotId,
        //     previewImage
        // })
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
            statusCode:403
        })
    }
})

router.post('/:spotIdForBooking/bookings',restoreUser,requireAuth,async(req,res) =>{
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotIdForBooking
        }
    })
    console.log(spot)
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (spot.ownerId === req.user.id){
        res.status(401).json({
            message: "can't book spot belongs to owner",
            key: 401
        })
    }
    try{
        const {startDate,endDate} = req.body
        const booking = await Booking.create({
            spotId: req.params.spotIdForBooking,
            userId: req.user.id,
            startDate,
            endDate
        })
        const booking1 = await Booking.findOne({
            where:{
                id: booking.id
            },
            attributes:['id','spotId','userId','startDate','endDate']
        })
        return res.json(booking1);
    }catch(e){
        res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }
})

router.put('/:spotId',restoreUser,requireAuth,async (req,res) =>{
    try{
        console.log(req.params.id)
        const {address,city,state,country,lat,lng,name,description,price,avgRating,previewImage,image} = req.body
        let spot = await Spot.findOne({
            where: {
                id: req.params.spotId,
                ownerId: req.user.id
            }
        })
        console.log(spot)
        spot.set({
            address,city,state,country,lat,lng,name,description,price,avgRating,previewImage,image
        })
        spot = await spot.save();
        let spott = await Spot.findOne({
            where: {
                id: spot.id
            },
            attributes: ['id','ownerId','address','city','state','country','lat','lng','name','description','price','avgRating','previewImage','image','createdAt','updatedAt']
        })
        res.json(spott)

    }catch (e){
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

router.delete('/:spotId',restoreUser,requireAuth,async(req,res) => {
    console.log("DELETED----------------------------")
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    await spot.destroy();
    return res.json(spot)
}
)
module.exports = router;
