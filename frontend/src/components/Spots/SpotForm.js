import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createASpot } from "../../store/spots.js";

const SpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    // console.log(sessionUser.id)
    const [address,setAddress] = useState("");
    const [city,setCity] = useState("");
    const [state,setState] = useState("");
    const [country,setCountry] = useState("");
    const [lat,setLat] = useState(0);
    const [lng,setLng] = useState(0);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState(0);
    const [avgRating,setAvgRating] = useState(0);
    const [previewImage,setPreviewImage] = useState("");
    const [image,setImage] = useState("");

    if(!sessionUser) return (
        <Redirect to="/login"/>
        );
        const ownerId = sessionUser.id

    const handleSubmit = (e) => {
        e.preventDefault();
        const spot = {ownerId,address,city,state,country,lat,lng,name,description,price,avgRating,previewImage,image};
        dispatch(createASpot(spot))

    }
    // useEffect(()=>{
    //     dispatch(createASpot())
    // },dispatch)

    return (
        <>
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
                <input className="itemSpotsShow2"
                type="text"
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
            </label >
            <input className="itemSpotsShow4" type="submit" value={'sumbit'}/>
        </form>
        </>
    )
}
export default SpotForm;
