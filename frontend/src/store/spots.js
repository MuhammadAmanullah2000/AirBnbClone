
import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spot/getSpots'
const ADD_SPOT = 'spot/addSpot';
const UPDATE_SPOT = 'spot/updateSpot';
const DELETE_SPOT = 'spot/deleteSpot';

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    }
}

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        payload: spot
    }
}

const deleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        payload: id
    }
}

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    }
}

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch("api/spots");
    const data = await response.json();
    // console.log(data.Spots)
    dispatch(getSpots(data.Spots));
    return response;
}

export const createASpot = (spot) => async (dispatch) => {
    const {ownerId,address,city,state,country,lat,lng,name,description,price,avgRating,previewImage,image} = spot;
    const response = await csrfFetch("/api/spots",{
        method: "POST",
        body: JSON.stringify({
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            avgRating,
            previewImage,
            image
        }),
    });
    const data = await response.json();
    console.log(data);
    console.log(response);
    dispatch(addSpot(data));
    return response;

}
const initialState =  {}
const spotReducer = (state = initialState,action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            newState = Object.assign({},state)
            // console.log(action.payload.Spots)
            action.payload.map(element => {
                newState[element.id] = element
            });
            return newState
        case ADD_SPOT:
            newState = Object.assign({},state)
            // newState[action.payload.Spot.id] =
            return newState;
        case UPDATE_SPOT:
            newState = [...newState,action.payload]
            return newState;
        case DELETE_SPOT:
            delete newState[action.payload.id]
            return newState;
        default:
            return state;
    }
}

export default spotReducer;
