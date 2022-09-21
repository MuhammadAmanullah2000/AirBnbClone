const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Review,Image,Spot,Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { ResultWithContext } = require('express-validator/src/chain');


const router = express.Router();

router.post('/:reviewId/images',restoreUser,requireAuth,async (req,res) => {
    try{
        console.log(req.user.id)
        const review = await Review.findOne({
            where:{
                id: req.params.reviewId,
                userId: req.user.id
            }
        });
        console.log(review)
        const newImage1 = await review.createReviewImage(req.body)
        const newImage2 = await Image.scope('reviewImage').findByPk(newImage1.id);
        return res.json(newImage2)

    }catch (e){
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

})

router.get('/current',restoreUser,requireAuth,async (req,res) =>{
    const Reviews = await Review.findAll({
        where:{
            userId: req.user.id
        },
        attributes :['id','userId','spotId','review','stars','createdAt','updatedAt'],
        include: [{
            model: Spot,
            attributes: ['id','ownerId','address','city','state','country','lat','lng','name','price']
        },
        {
            model: Image,
            as: 'ReviewImages',
            attributes: ['id','url']
        },
        {
            model: User,
            attributes: ['id','firstName','lastName']
        }
    ]

    })
    return res.json({Reviews})
})

router.put('/:reviewId',restoreUser,requireAuth,async(req,res) => {
    try{
        console.log(req.params.reviewId)
        const review = await Review.findOne({
            where: {
                id: req.params.reviewId,
                userId: req.user.id
            }
        })
        const review1 = review.set(req.body)
        await review.save();
        return res.json(review);

    }catch (e){
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
})

router.delete('/:reviewId',restoreUser,requireAuth,async(req,res) => {
    const review = await Review.findByPk(req.params.reviewId);
    if(!review){
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    await review.destroy();
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
}
)




module.exports = router;
