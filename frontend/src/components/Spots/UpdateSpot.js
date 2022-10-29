// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateASpot } from "../../store/spots";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import SpotForm from "./SpotForm";

// const UpdatingSpot = () => {
//     const dispatch = useDispatch();
//     const id = useParams();
//     const spotChoosing = id.spotId
//     const spotStateObj = useSelector((store) => store)
//     console.log(spotStateObj)
//     console.log(id)

//     useEffect(()=>{
//         dispatch(updateASpot(1))
//     })
//     // const spot = useSelector((state) => state)
//     // console.log(spot)
//     const [address,setAddress] = useState();
//     const [city,setCity] = useState();
//     const [state,setState] = useState();
//     const [country,setCountry] = useState();
//     const [lat,setLat] = useState();
//     const [lng,setLng] = useState();
//     const [name,setName] = useState();
//     const [description,setDescription] = useState();
//     const [price,setPrice] = useState();
//     const [avgRating,setAvgRating] = useState();
//     const [previewImage,setPreviewImage] = useState();
//     const [image,setImage] = useState();

//     return (
//         <div>Abc</div>
//     )
// }
// export default UpdatingSpot
