import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImage from "../components/PlaceImage";

function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }

    const truncated = description.substr(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");

    return truncated.substr(0, lastSpaceIndex) + "...";
  };

  return (
    <div className="">
      <AccountNav />

      <div className="text-center">
        <Link
          className="inline-flex bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              key={place._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="w-32 h-32 bg-gray-300 grow shrink-0">
                <PlaceImage
                  place={place}
                  className="object-cover aspect-square"
                />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl ">{place.title}</h2>
                <p className="text-sm mt-2">
                  {truncateDescription(place.description, 500)}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default PlacesPage;
