import React from "react";
import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'


function SpotById() {
    const idNo = useParams();
    console.log(idNo.spotId)
    const spots = useSelector((state)=>Object.values(state.spots))
    const spotObj = spots[idNo.spotId]
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
