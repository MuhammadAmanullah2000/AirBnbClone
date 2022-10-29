import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { getAllSpots } from "../../store/spots";
import './Spots.css';
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom'

function AllSpots(){
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        dispatch(getAllSpots())
    },[dispatch])
    const user = useSelector((state) => state.session.user)
    console.log(user)
    const spots2 = useSelector((state) => state.spots)
    console.log(spots2)
    // const spots3 = useSelector((state) => Object.keys(state.spots))
    // console.log(spots3)
    const currentStore = useSelector((state) => Object.values(state.spots))
    console.log(currentStore)
    let sppotName = [];
    currentStore.map((ele,i) =>{
        sppotName[i] = ele.name
    })
    let imageArr = [];
    currentStore.map((ele,i)=>{
        imageArr[i] = ele.image
    })
    console.log(imageArr)

    const showSpotDetails = (index) => {
        history.push(`/spots/${index}`)
    }

    
    // if(user.id === ){
    //     return (
    //         <div>
    //         {imageArr.map((el,i) =>(
    //             <div>
    //             <img src={el} alt='image not uploaded'/>
    //             <button onClick={()=> showSpotDetails(i)}>{sppotName[i]}</button>
    //             </div>
    //         ))}
    //     </div>
    //     )
    // }

    return (
        <div>
            {imageArr.map((el,i) =>(
                <div>
                <img src={el} alt='image not uploaded'/>
                <button onClick={()=> showSpotDetails(i)}>{sppotName[i]}</button>
                </div>
            ))}
        </div>
    )

}

export default AllSpots;
// newState[action.payload.id] = action.payload
