import { useCallback, useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(userContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numDays = 0;

  if (checkIn && checkOut) {
    numDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function handleBooking() {
    try {
      const res = await axios.post("/bookings", {
        checkIn,
        checkOut,
        numGuests,
        name,
        phone,
        place: place._id,
        price: numDays * place.price,
      });
      const bookingId = res.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <h2 className="text-2xl text-center">
        price: ${place.price} / per night
      </h2>

      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className=" py-3 px-4 ">
            <label>Check in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className=" py-3 px-4 border-t">
            <label>Check out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className=" py-3 px-4 border-t">
          <label>Number of guests: </label>
          <input
            type="number"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
          />
        </div>
        {numDays > 0 && (
          <div className=" py-3 px-4 border-t">
            <label>Your full name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone number: </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={handleBooking} className="primary mt-4">
        Book this place
        {numDays > 0 && <span> ${numDays * place.price}</span>}
      </button>
    </div>
  );
}

export default BookingWidget;
