import { useState } from "react";

function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white ">
        <div className="p-8 gap-4 bg-black flex flex-col justify-center">
          <div>
            <h2 className="text-3xl ml-48">Photos of {place.title}</h2>

            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed top-8 flex gap-2 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo} className="flex justify-center">
                <img
                  src={`http://localhost:5500/uploads/${photo}`}
                  className="aspect-auto object-cover w-full h-full"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-1 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => {
                  setShowAllPhotos(true);
                }}
                className="aspect-square object-cover cursor-pointer w-full h-full -er"
                src={`http://localhost:5500/uploads/${place.photos[0]}`}
                alt="photo of properety"
              />
            </div>
          )}
        </div>
        <div className="grid">
          <img
            onClick={() => {
              setShowAllPhotos(true);
            }}
            className="aspect-square object-cover cursor-pointer"
            src={`http://localhost:5500/uploads/${place.photos[1]}`}
            alt="photo of properety"
          />
          <div className="overflow-hidden">
            <img
              onClick={() => {
                setShowAllPhotos(true);
              }}
              className="aspect-square object-cover cursor-pointer relative top-2"
              src={`http://localhost:5500/uploads/${place.photos[2]}`}
              alt="photo of properety"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white bg-opacity-75 rounded-2xl shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}

export default PlaceGallery;
