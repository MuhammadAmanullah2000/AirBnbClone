import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/SpotsShow";
import SpotById from "./components/Spots/SpotById";
import SpotForm from "./components/Spots/SpotForm";
import UpdatingSpot from "./components/Spots/UpdateSpot";
import BookingForm from "./components/Booking/BookingForm";
import AllBookings from "./components/Booking/BookingShow";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/bookings/create">
            <BookingForm />
          </Route>
          <Route path="/bookings/current">
            <AllBookings />
          </Route>
          <Route path="/spots/create">
            <SpotForm />
          </Route>
          <Route path="/spots/update">
            <SpotById />
          </Route>
          <Route path="/spots/:spotId">
            <SpotById />
          </Route>
          <Route path="/spots">
            <AllSpots />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
//abcde
