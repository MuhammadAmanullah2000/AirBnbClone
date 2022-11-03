const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Spot,Image,Review,Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

router.get('/current',restoreUser,requireAuth,async(req,res)=>{
    const Bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        attributes: ['id','spotId','userId','startDate','endDate','createdAt','updatedAt'],
        include:[{
            model: Spot,
            attributes: ['id','ownerId','address','city','state','country','lat','lng','name','price','previewImage']
        }],
        order: [['id'],['spotId'],[Spot,'id'],[Spot,'ownerId'],[Spot,'address'],[Spot,'city'],[Spot,'state'],[Spot,'country'],[Spot,'lat'],[Spot,'lng'],[Spot,'name'],[Spot,'price'],[Spot,'previewImage'],['userId'],['startDate'],['endDate'],['createdAt'],['updatedAt']]
    })
    return res.json({Bookings});
})

router.put('/:bookingId',restoreUser,requireAuth,async(req,res) => {
    try{
        const booking = await Booking.findOne({
            where: {
                id: req.params.bookingId,
                userId: req.user.id
            }
        })
        const booking1 = booking.set(req.body)
        await booking.save()
        return res.json(booking)

    }catch (e){
        res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
})

router.delete('/:bookingId',restoreUser,requireAuth,async(req,res) => {
        const booking = await Booking.findByPk(req.params.bookingId);
        if(!booking){
            return res.status(404).json({
                message: "Booking couldn't be found",
                statusCode: 404
            })
        }
        await booking.destroy();
        return res.json(booking)
    }
)
module.exports = router;
