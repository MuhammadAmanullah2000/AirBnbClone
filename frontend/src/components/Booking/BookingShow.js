import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { getAllBookings } from "../../store/bookings";

function AllBookings() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        dispatch(getAllBookings())
    },[dispatch])
    const user = useSelector((state) => state.session.user)
    const currentStore = useSelector((state) => Object.values(state.spots))
    console.log(currentStore)
    return (
        <div>
            Abc
        </div>
    )
}
export default AllBookings
