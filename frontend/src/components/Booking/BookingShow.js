import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { getAllBookings } from "../../store/bookings.js";
import { deleteABooking } from "../../store/bookings.js";
import './Bookings.css'

function AllBookings() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        dispatch(getAllBookings())
    },[dispatch])
    const user = useSelector((state) => state.session.user)
    const allSpots = useSelector((state) => Object.values(state.spots));
    console.log(allSpots);
    const allBookings = useSelector((state) => Object.values(state.bookings))
    console.log(allBookings)
    // const spotName = allSpots[allBookings]
    const handleClick = (el) => {
        console.log('el');
        const booking = el;
        const deletedBooking = dispatch(deleteABooking(booking));
        history.push('/spots');
    }
    return (
        <div>
            {allBookings.map((el,i) => (
                <div>
                    <h2 className="headersBookings">Booking{i+1}:</h2>
                    <p className="itemsBookings">Place:  {allSpots[i].name}</p>
                    <p className="itemsBookings">From:  {el.startDate}</p>
                    <p className="itemsBookings">Till:  {el.endDate}</p>
                    <button className="deleteBookings" onClick={(e)=>handleClick(el)}>Delete booking</button>
                </div>
            ))}
        </div>
    )
}
export default AllBookings
