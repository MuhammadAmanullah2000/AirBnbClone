const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Review,Image,Spot,Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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
        const newImage1 = await review.createImage(req.body)
        const newImage2 = await Image.scope('reviewImage').findByPk(newImage1.id);
        return res.json(newImage2)

    }catch (e){
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

})



module.exports = router;
