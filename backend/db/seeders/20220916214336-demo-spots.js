'use strict';
const { Spot, User } = require('../models');
const spots = [
  {
      ownerId:1,
      address:'46 Block A',
      city:'Karachi',
      state:'Sindh',
      country:'Pakistan',
      lat:45.6,
      lng:32.6,
      name:'GuestHouseGood',
      description:'Excellent comfort',
      price:45,
      avgRating:4.2,
      previewImage: 'good url'
  },
  {   ownerId:2,
      address:'46 Block B',
      city:'Karachi',
      state:'Sindh',
      country:'Pakistan',
      lat:45.5,
      lng:32.5,
      name:'GuestHouseAvg',
      description:'Very comfortable',
      price:35,
      avgRating:3.2,
      previewImage:'avg url'
},
{
      ownerId:3,
      address:'46 Block C',
      city:'Karachi',
      state:'Sindh',
      country:'Pakistan',
      lat:45.4,
      lng:32.4,
      name:'GuestHouseBad',
      description:'Comfortable',
      price:25,
      avgRating:2.2,
      previewImage:'bad url'
}
]
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let diffSpots of spots) {
      // const { name, homeCity } = teamInfo;
      const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        avgRating,
        previewImage
      } = diffSpots
      const foundUser = await User.findOne({
        where: { id: diffSpots.ownerId }
      });
      await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        avgRating,
        previewImage,
        ownerId: foundUser.id
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {}, {});
  }
};
// {
//   where: { name: spots.map(spot => spot.name) }
// },
