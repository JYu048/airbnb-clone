import axios from "axios";
import { useState } from "react";

function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(e) {
    e.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      onChange((prev) => [...prev, filename]);
      setPhotoLink("");
    } catch (err) {
      alert("Invalid link");
    }
  }

  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) data.append("photos", files[i]);
    console.log(data);

    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        onChange((prev) => [...prev, ...filenames]);
      });
  }

  return (
    <>
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
            <div key={link} className="h-32 flex">
              <img
                src={"http://localhost:5500/uploads/" + link}
                className="rounded-2xl w-full object-cover"
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer flex justify-center items-center gap-2 text-2xl text-gray-600 border bg-transparent rounded-2xl p-2">
          <input
            type="file"
            multiple
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
    </>
  );
}

export default PhotosUploader;
