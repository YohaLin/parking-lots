// Marker => 可以加上地標圖示
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Information from "../components/Information";
import key from "../key";
import convertProj4 from "../helpers/proj4"; // 將EPSG:3826 轉乘EPSG:4326

// 先定義中央位置
const libraries = ["places"];
const PARKING_LOTS_URL =
  "https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json";

// 程式入口～～
function Parking() {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({
    lat: 25.04,
    lng: 121.5,
  });

  useEffect(() => {
    fetchParkingLotsHandler();
    // 定位目前的位置
    navigator.geolocation.watchPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  async function fetchParkingLotsHandler() {
    try {
      const res = await fetch(PARKING_LOTS_URL);

      const { data } = await res.json();

      // 從API傳來的data改成自己想要的陣列(捨棄不需要的資料)
      const transformedData = data.park.map((park) => {
        return {
          id: park.id,
          area: park.area,
          name: park.name,
          summary: park.summary,
          address: park.address,
          tel: park.tel,
          payex: park.payex,
          serviceTime: park.serviceTime,
          tw97x: park.tw97x,
          tw97y: park.tw97y,
          totalcar: park.totalcar,
        };
      });

      setData(transformedData); // fetch data 之後就把data塞進setData
    } catch (error) {
      console.log(error);
    }
  }

  // libraries: API的名稱, key()是從key.js來的
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key(),
    libraries,
  });

  if (!isLoaded) {
    return <div>loading</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {data.length > 0 && <Information />}
      <GoogleMap
        center={position}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/* 印出想要的Marker */}
        {data.map((park) => {
          return <Marker key={park.id} position={convertProj4(park.tw97x, park.tw97y)} />;
        })}
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}

export default Parking;
