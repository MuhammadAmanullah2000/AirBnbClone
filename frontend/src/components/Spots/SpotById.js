import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import {updateASpot} from "../../store/spots.js"
// import {useForm} from "react-hook-form"
import {deleteASpot} from "../../store/spots.js"
// import BookingForm from "../Booking/BookingForm.js"
import "./Spots.css"
import "../Booking/Bookings.css"


function SpotById() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {spotId} = useParams();
    // console.log(idNo)
    // if(!idNo.spotId){
    //     history.push('/')
    // }
    const id = spotId
    // console.log(id)
    const store = useSelector((state) => state);
    // console.log(store.spots)
    // if(store.session){
        //     const User = useSelector((state) => state.session.user.id)
        //     console.log(User)

        // }
        let User=100;
        if (store.session.user){
            User = store.session.user.id
            console.log(User)
        }
        const spots = useSelector((state)=> state.spots)
        console.log(spots[id],"current spot showing")
        // if(spots[id]===undefined){
        //     return(
        //         <div>
        //             {history.push('/')}
        //         </div>
        //     )
        // }
    const spotObj = spots[spotId]

    const id1 = spotObj?.id
    console.log(id1)
    console.log(spotObj)
    const ownerId = spotObj?.ownerId
    const [address,setAddress] = useState(spotObj.address);
    const [city,setCity] = useState(spotObj.city);
    const [state,setState] = useState(spotObj.state);
    const [country,setCountry] = useState(spotObj.country);
    const [lat,setLat] = useState(spotObj.lat);
    const [lng,setLng] = useState(spotObj.lng);
    const [name,setName] = useState(spotObj.name);
    const [description,setDescription] = useState(spotObj.description);
    const [price,setPrice] = useState(spotObj.price);
    const [avgRating,setAvgRating] = useState(spotObj.avgRating);
    const [previewImage,setPreviewImage] = useState(spotObj.previewImage);
    const [image,setImage] = useState(spotObj.image);

    const spotKeys = Object.keys(spotObj).slice(2,11)
    const details = [];
    const spotValues = Object.values(spotObj).slice(2,11)

    console.log(spotObj)
    console.log(spotKeys)
    console.log(spotValues)

    const handleClick = (e) => {
        e.preventDefault();
        // <BookingForm id1={id1} />
        history.push({
            pathname: '/bookings/create',
            state: {detail:id1}
        })
    }


    const handleSubmit = async(e) => {
        // console.log(e.nativeEvent.submitter.value,"vvjyjk")
        e.preventDefault();

        if(e.nativeEvent.submitter.value === "delete"){
            console.log(e.nativeEvent.submitter.value,"ABFBISJ");
            console.log("DELETING");
            const spot = {id1}
            const deletedSpot =  dispatch(deleteASpot(spot));
            history.push('/')

        }
        else if(e.nativeEvent.submitter.value === "update"){
            // e.preventDefault();
            if(address.length && city.length && state.length && country.length && name.length && description.length && previewImage.length && image.length && lat !== 0 && lng !== 0 && avgRating !== 0 && price !== 0){
                const spot = {id1,ownerId,address,city,state,country,lat,lng,name,description,price,avgRating,previewImage,image};
                dispatch(updateASpot(spot))
                history.push('/')

            }
            history.push('/')
        }
        // }else if(e.nativeEvent.submitter.value === "createNewBooking"){
        //     e.preventDefault();
        //     console.log(e.nativeEvent.submitter.value);
        //     history.push(`/bookings/create`)

        // }
        else{
            console.log("abc")
        }
    }

    if(store.session.user===undefined){
        return (
            <div>
            <img className="showingSpots" src={spotObj.image}/>
            <span>
                {spotKeys.map((el,i)=>(
                    <div>
                    <span>{el}:  </span>
                    <span className="itemSpotsShow5"> {spotValues[i]}  </span>
                    </div>
                ))}
            </span>
                </div>
        )

        }else if(User!==ownerId){
            return (
                <>
                <img className="showingSpots" src={spotObj.image}/>
                <div>
                    {spotKeys.map((el,i)=>(
                        <div>
                        <span>{el}:  </span>
                        <span className="itemSpotsShow5">{spotValues[i]}   </span>
                        </div>
                    ))}
                </div>
                <div>
                <button className="createBookings" onClick={(e)=>handleClick(e)}>Create a booking</button>
                </div>
                </>
            )
    }else if(User === ownerId){
        return (
            <div className="makeAndUpdateSpots">
            <img className="showingSpots" src={spotObj.image}/>
            <form onSubmit={handleSubmit}>
            <label className="itemSpotsShow">
                Address:
                <input className="itemSpotsShow2"
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                City:
                <input className="itemSpotsShow2"
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                State:
                <input className="itemSpotsShow2"
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                Country:
                <input className="itemSpotsShow2"
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                Lat:
                <input className="itemSpotsShow2"
                type="text"
                value={lat}
                onChange={e => setLat(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                Lng:
                <input className="itemSpotsShow2"
                type="text"
                value={lng}
                onChange={e => setLng(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                Name:
                <input
                type="text" className="itemSpotsShow2"
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                Description:
                <input className="itemSpotsShow2"
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                Price:
                <input className="itemSpotsShow2"
                type="text"
                value={price}
                onChange={e => setPrice(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                AvgRating:
                <input className="itemSpotsShow2"
                type="text"
                value={avgRating}
                onChange={e => setAvgRating(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                PreviewImage:
                <input className="itemSpotsShow2"
                type="text"
                value={previewImage}
                onChange={e => setPreviewImage(e.target.value)}
                />
            </label>
            <label className="itemSpotsShow">
                Image:
                <input className="itemSpotsShow2"
                type="text"
                value={image}
                onChange={e => setImage(e.target.value)}
                />
            </label>
            <div>
            <input className="itemSpotsShow4" type="submit" value={'update'}/>
            {/* <input type="submit" name="deleteButton" value={'delete'}/> */}
            <input className="itemSpotsShow3" type="submit" value={'delete'}/>
            </div>
        </form>
                </div>
        )

    }

}

export default SpotById;
