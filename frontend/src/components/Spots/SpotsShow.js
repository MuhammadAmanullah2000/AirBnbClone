import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { getAllSpots } from "../../store/spots";
import './Spots.css';

function AllSpots(){
    const dispatch = useDispatch();
    const spotAll = dispatch(getAllSpots())

    return (
        <div>
            {spotAll}
        </div>
    )

}

export default AllSpots;
