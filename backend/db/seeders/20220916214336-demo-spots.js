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
      name:'The gardens',
      description:'Comfortable and relaxing,prices are in dollars and are subject to foreign exchange rate at the time of arrival',
      price:45,
      avgRating:4.2,
      previewImage:'https://i.ytimg.com/vi/1hxxgy-dAS0/hqdefault.jpg',
      image:'https://imageio.forbes.com/specials-images/imageserve/5e05ae84e961e1000739fd8f/A-beautiful-luxury-Airbnb-bedroom-with-a-balcony-in-Punta-Mita--Mexico-/960x0.jpg?format=jpg&width=960'
  },
  {   ownerId:2,
      address:'46 Block B',
      city:'Mumbai',
      state:'Maharashtra',
      country:'India',
      lat:45.5,
      lng:32.5,
      name:'Star homes',
      description:'Near the city centre,prices are in dollars and are subject to foreign exchange rate at the time of arrival',
      price:35,
      avgRating:3.2,
      previewImage:'https://images.homify.com/c_fill,f_auto,q_0,w_740/v1442402047/p/photo/image/912334/DSC_6022.jpg',
      image:'https://a0.muscache.com/pictures/5fcbb0af-ace5-47bb-b251-eba6ada69681.jpg'
},
{
      ownerId:3,
      address:'46 Block C',
      city:'Lahore',
      state:'Punjab',
      country:'Pakistan',
      lat:45.4,
      lng:32.4,
      name:'Romara room',
      description:'Right next to the national stadium,prices are in dollars and are subject to foreign exchange rate at the time of arrival',
      price:25,
      avgRating:2.2,
      previewImage:'https://jessicamudditt.files.wordpress.com/2012/06/mohammadpur.jpg',
      image:'https://furnishrcdn-134f8.kxcdn.com/wp-content/uploads/bedroom4-2.jpg'
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
        previewImage,
        image
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
        image,
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
