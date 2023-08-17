function PlaceImage({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      className={className}
      src={`http://localhost:5500/uploads/${place.photos[index]}`}
      alt=""
    />
  );
}

export default PlaceImage;
