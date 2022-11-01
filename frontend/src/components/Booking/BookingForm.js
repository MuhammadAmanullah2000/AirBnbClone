import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createABooking } from "../../store/bookings";
import { useLocation } from "react-router-dom";
const BookingForm = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const spotId = location.state.detail
    console.log(spotId)
    const userId = sessionUser.id;
    const [startDate,setStartDate] = useState(0);
    const [endDate,setEndDate] = useState(0);
    if(!sessionUser) return (
        <Redirect to ="/loging"/>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const booking = {spotId,userId,startDate,endDate};
        dispatch(createABooking(booking))
    }
    return (
       <form onSubmit={handleSubmit}>
        <label>
            startDate
            <input
            type="text"
            value={startDate}
            onChange={e=>setStartDate(e.target.value)}
            />
        </label>
        <label>
            endDate
            <input
            type="text"
            value={endDate}
            onChange={e=>setEndDate(e.target.value)}
            />
        </label>
        <input type="submit" value={'submit'}/>
       </form>
    )
}

export default BookingForm;
