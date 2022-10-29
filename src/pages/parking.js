// Marker => 可以加上地標圖示
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import key from "../key";

// 先定義中央位置
const center = { lat: 25.0338062, lng: 121.5625299 };
const libraries = ["places"];

function Parking() {
  // libraries: API的名稱, key()是從key.js來的
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key(),
    libraries,
  });
  console.log(key());

  if (!isLoaded) {
    return <div>loading</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

export default Parking;
