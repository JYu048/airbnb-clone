import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";

function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function preInput(header, description) {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  }

  async function addPhotoByLink(e) {
    e.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => [...prev, filename]);
      setPhotoLink("");
    } catch (err) {
      console.log("invalid link");
    }
  }

  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    data.set("file", files[0]);
    axios.post("/upload", data);
  }

  return (
    <div className="">
      {action !== "new" ? (
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
      ) : (
        <div>
          <form>
            {preInput(
              "Title",
              "Title for your place, should be short and catchy as in advertisement"
            )}
            <input
              type="text"
              placeholder="title, for example: Seaside cottage"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {preInput("Address", "Address to this place")}
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {preInput("Photos", "more = better")}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={"Add using a link to image ... jpg"}
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button
                className="bg-gray-200 px-4 rounded-2xl"
                onClick={(e) => addPhotoByLink(e)}
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div key={link}>
                    <img
                      src={"http://localhost:5500/uploads/" + link}
                      className="rounded-xl"
                    />
                  </div>
                ))}
              <label className="flex justify-center items-center gap-2 text-2xl text-gray-600 border bg-transparent rounded-2xl p-2">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => uploadPhoto(e)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>

            {preInput("Description", "description of the place")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {preInput("Perks", "select all the perks of your place")}
            <Perks selected={perks} onChange={setPerks} />

            {preInput("Extra info", "house rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            {preInput(
              "Check in & out times, max guests",
              "add check in and out times, remember to have some time window for cleaning the room between guests"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>
            <button className="primary mt-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PlacesPage;
