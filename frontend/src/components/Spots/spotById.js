import React from "react";
import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'


function SpotById() {
    const idNo = useParams();
    console.log(idNo.spotId)
    const spots = useSelector((state)=>Object.values(state.spots))
    const spotArr = spots[idNo.spotId]
    const details = []
    spotArr.map((el,i))
    console.log(spotArr)
    return (
        <div>
            {/* {spotArr.map((el,i)=>(
                <p>{el}</p>
            ))} */}
        </div>
    )
}

export default SpotById;
