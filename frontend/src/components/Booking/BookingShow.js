import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { getAllBookings } from "../../store/bookings.js";
import { deleteABooking } from "../../store/bookings.js";
import { useLocation } from "react-router-dom";
import './Bookings.css'

function AllBookings() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    useEffect(()=>{
        dispatch(getAllBookings())
    },[dispatch])
    const user = useSelector((state) => state.session.user)
    // const spotId = location.state.detail
    // const genralState = useSelector((state) => state.spots)
    // console.log(genralState)
    const allSpots = useSelector((state) => Object.values(state.spots));
    console.log('THIS IS ALL SPOTS',allSpots);
    const allBookings = useSelector((state) => Object.values(state.bookings))
    console.log('THIS IS ALL BOOKINGS',allBookings)
    // const spotName = allSpots[allBookings]
    // const spotName1 = allSpots.find(ele => ele.id === 2).name
    // console.log(spotName1)
    // function spotName(spotId) {
    //     return spot.id === spotId;
    //   }
    const handleClick = (el) => {
        console.log('el');
        const booking = el;
        const deletedBooking = dispatch(deleteABooking(booking));
    }
    return (
        <div>
            {user && allBookings && allSpots && allBookings.map((el,i) => (
                <div>
                    <h2 className="headersBookings">Booking{i+1}:</h2>
                    <p className="itemsBookings">Place: {allSpots.find(ele => ele.id === el.spotId).name} </p>
                    <p className="itemsBookings">From:  {el.startDate}</p>
                    <p className="itemsBookings">Till:  {el.endDate}</p>
                    <button className="deleteBookings" onClick={(e)=>handleClick(el)}>Delete booking</button>
                </div>
            ))}
        </div>
    )
}
export default AllBookings
