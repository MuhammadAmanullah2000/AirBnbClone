import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { getAllSpots } from "../../store/spots";
import './Spots.css';

function AllSpots(){
    const dispatch = useDispatch();
    dispatch(getAllSpots())
    const currentStore = useSelector((state) => Object.values(state.spots))
    let imageArr = [];
    currentStore.forEach((ele,i)=>{
        imageArr[i] = ele.image
    })
    console.log(imageArr)

    return (
        <div>
            {imageArr.forEach(el =>(
                <img src={el} alt='image not uploaded'/>
            ))}
        </div>
    )

}

export default AllSpots;
