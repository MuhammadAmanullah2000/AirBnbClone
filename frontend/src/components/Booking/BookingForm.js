import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createABooking } from "../../store/bookings.js";
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
        history.push('/bookings/current')
    }
    return (
        <div className="overallBookingForm">

       <form onSubmit={handleSubmit}>
        <label className="from">
            From:
            <input className="from1"
            type="text"
            value={startDate}
            onChange={e=>setStartDate(e.target.value)}
            />
        </label>
        <label className="till">
            Till:
            <input className="till1"
            type="text"
            value={endDate}
            onChange={e=>setEndDate(e.target.value)}
            />
        </label>
        <input className="submitBooking" type="submit" value={'Submit'}/>
       </form>
            </div>
    )
}

export default BookingForm;
