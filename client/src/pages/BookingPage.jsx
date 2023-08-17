import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((res) => {
        const foundBooking = res.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl"> {booking.place.title}</h1>
      <AddressLink className="my-2 block" place={booking.place} />
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center first-letter: ">
        <div>
          {" "}
          <h2 className="text-2xl mb-4">Your booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="flex gap-1 items-center">
          <div className="bg-primary p-4 text-white rounded-2xl">
            {" "}
            <div className="text-md "> Total price</div>
            <span className="text-xl"> ${booking.price}</span>
          </div>
        </div>
      </div>

      <PlaceGallery place={booking.place} />
    </div>
  );
}

export default BookingPage;
