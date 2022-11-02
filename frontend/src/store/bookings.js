

import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'booking/getBookings';
const ADD_BOOKING = 'booking/addBooking';
const DELETE_BOOKING = 'booking/deleteBooking';

const getBookings = (bookings) => {
    return {
        type: GET_BOOKINGS,
        payload: bookings
    }
}

const addBooking = (booking) => {
    return {
        type: ADD_BOOKING,
        payload: booking
    }
}

const deleteBooking = (booking) => {
    return {
        type: DELETE_BOOKING,
        payload: booking
    }
}

export const getAllBookings = () => async(dispatch) => {
    const response = await csrfFetch("/api/bookings/current");
    const data = await response.json();
    dispatch(getBookings(data.Bookings));
    return response;
}

export const createABooking = (booking) => async(dispatch) => {
    const {spotId,userId,startDate,endDate} =  booking;
    console.log(userId)
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`,{
        method: "POST",
        body: JSON.stringify({
            spotId,
            userId,
            startDate,
            endDate
        }),
    });
    const data = await response.json();
    dispatch(addBooking(data));
    return response;
}

export const deleteABooking = (booking) => async(dispatch) => {
    const {id} = booking;
    const response = await csrfFetch(`/api/bookings/${id}`,{
        method: "DELETE"
    });
    const data = await response.json();
    console.log(data,"DATA");
    dispatch(deleteBooking(data));
    return response;
}
const initialState = {}
const bookingReducer = (state = initialState,action) => {
    let newState;
    switch(action.type) {
        case GET_BOOKINGS:
            newState = Object.assign({},state)
            action.payload.map(element => {
                newState[element.id] = element
            });
            return newState;
        case ADD_BOOKING:
            newState = Object.assign({},state)
            console.log(action.payload.id)
            newState[action.payload.id] = action.payload
            console.log(newState)
            return newState;
        case DELETE_BOOKING:
            newState = Object.assign({},state)
            console.log(action.payload)
            delete newState[action.payload.id]
            console.log(newState)
            return newState;
        default:
            return state;

    }
}

export default bookingReducer;
