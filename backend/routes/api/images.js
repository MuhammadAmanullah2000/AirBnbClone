const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Image,Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

router.delete('/:reviewImageId',restoreUser,requireAuth,async(req,res) => {
    const image = await Image.findByPk(req.params.reviewImageId);
    if(!image){
        return res.status(404).json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }
    await image.destroy();
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})
module.exports = router;
