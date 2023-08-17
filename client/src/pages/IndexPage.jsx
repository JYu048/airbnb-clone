import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(res.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            <div className="flex mb-2">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl aspect-square object-cover"
                  src={`http://localhost:5500/uploads/${place.photos[0]}`}
                  alt="photo of property"
                />
              )}
            </div>

            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm truncate text-gray-500">{place.title}</h3>
            <div className="mt-2">
              <span className="font-bold">${place.price} </span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage;
