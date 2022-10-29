import React from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import {updateASpot} from "../../store/spots"


function SpotById() {
    const dispatch = useDispatch();
    const idNo = useParams();
    const id = idNo.spotId
    // console.log(id)
    const store = useSelector((state) => state);
    console.log(store)
    const User = useSelector((state) => state.session.user.id)
    console.log(User)
    const spots = useSelector((state)=>Object.values(state.spots))
    const spotObj = spots[idNo.spotId]

    const id1 = spotObj.id
    console.log(id1)
    console.log(spotObj)
    const ownerId = spotObj.ownerId
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

    const handleSubmit = (e) => {
        console.log(e,"this is the event")
        e.preventDefault();
        const spot = {id1,ownerId,address,city,state,country,lat,lng,name,description,price,avgRating,previewImage,image};
        dispatch(updateASpot(spot))
    }
    if(User === ownerId){
        return (
            <form onSubmit={handleSubmit}>
            <label>
                Address
                <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                />
            </label>
            <label>
                City
                <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                />
            </label>
            <label>
                State
                <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                />
            </label>
            <label>
                Country
                <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                />
            </label>
            <label>
                Lat
                <input
                type="text"
                value={lat}
                onChange={e => setLat(e.target.value)}
                />
            </label>
            <label>
                Lng
                <input
                type="text"
                value={lng}
                onChange={e => setLng(e.target.value)}
                />
            </label>
            <label>
                Name
                <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Description
                <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
            </label>
            <label>
                Price
                <input
                type="text"
                value={price}
                onChange={e => setPrice(e.target.value)}
                />
            </label>
            <label>
                AvgRating
                <input
                type="text"
                value={avgRating}
                onChange={e => setAvgRating(e.target.value)}
                />
            </label>
            <label>
                PreviewImage
                <input
                type="text"
                value={previewImage}
                onChange={e => setPreviewImage(e.target.value)}
                />
            </label>
            <label>
                Image
                <input
                type="text"
                value={image}
                onChange={e => setImage(e.target.value)}
                />
            </label>
            <button>Update</button>
            <input type="submit" value={'delete'}/>
        </form>
        )
    }
    const spotKeys = Object.keys(spotObj).slice(2,11)
    const details = [];
    const spotValues = Object.values(spotObj).slice(2,11)

    console.log(spotObj)
    console.log(spotKeys)
    console.log(spotValues)
    return (
        <div>
            {spotKeys.map((el,i)=>(
                <div>
                <span>{el}:  </span>
                <span>{spotValues[i]}:  </span>
                </div>
            ))}
        </div>
    )
}

export default SpotById;
