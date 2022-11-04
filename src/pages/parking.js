// Marker => 可以加上地標圖示
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Information from "../components/Information";
import key from "../key";
import convertProj4 from "../helpers/proj4"; // 將EPSG:3826 轉乘EPSG:4326

import marker from "./../assets/images/marker.svg";
import markerZero from "./../assets/images/markerZero.svg";

// 先定義中央位置
const libraries = ["places"];
const PARKING_LOTS_URL =
  "https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json";
const REMAINING_URL =
  "https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json";

// 程式入口～～
function Parking() {
  const dispatch = useDispatch();
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [data, setData] = useState([]);
  const [remainingCar, setRemainingCar] = useState([]);
  const [dataId, setDataId] = useState(null)
  const [info, setInfo] = useState([])
  const [position, setPosition] = useState({
    lat: 25.04,
    lng: 121.5,
  });
  const myPosition = useSelector((state) => state.myPosition); // boolean



  // 取得停車場剩餘車數資料API
  async function fetchRemainingCarHandler() {
    try {
      const res = await fetch(REMAINING_URL);

      const { data } = await res.json();

      // 從API傳來的data改成自己想要的陣列(捨棄不需要的資料)，FareInfo是object，要解構
      const transformedData = data.park.map((remainingCar) => {
        return {
          id: remainingCar.id,
          remainingCar: remainingCar.availablecar,
        };
      });

      setRemainingCar(transformedData); // fetch data 之後就把data塞進setData
    } catch (error) {
      console.log(error);
    }
  }

  // 取得停車場資料API，並合併停車場剩餘車數資料API
  async function fetchParkingLotsHandler() {
    try {
      const res = await fetch(PARKING_LOTS_URL);

      const { data } = await res.json();

      // 從API傳來的data改成自己想要的陣列(捨棄不需要的資料)，FareInfo是object，要解構
      const transformedData = await data.park.map((park) => {
        const findCar = remainingCar.find((car) => car.id === park.id);
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
          FareInfo: park.FareInfo.WorkingDay
                    ? park.FareInfo.WorkingDay[0].Fare
                    : "?",
          remainingCar: findCar ? findCar.remainingCar : 0,
        };
      });

      setData(transformedData); // fetch data 之後就把data塞進setData
    } catch (error) {
      console.log(error);
    }
  }

  // 使用者點擊想查詢的停車場，進行比對
  function getInfo(dataId){
    const info = data.find(park => {
      return park.id === dataId
    })
    return {
      ...info
    }
  }

  // 進入網頁就定位目前的位置
  useEffect(() => {
    fetchRemainingCarHandler();
  }, []);

  // 當剩餘停車位資料出現時才fetch停車場資料，並定位
  useEffect(() => {
    fetchParkingLotsHandler();
    navigator.geolocation.watchPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [remainingCar]);

  // 當按下定位按鈕時會改變redux裡面的state
  useEffect(() => {
    if (myPosition === true) {
      map.panTo(position);
      dispatch({ type: "notMyPosition" }); // 當Marker定位完之後就把狀態設為false
    }
    // eslint-disable-next-line
  }, [myPosition]);

  // 當取得使用者點擊停車場的id，會將資料放進info
  useEffect(() => {
    console.log('change',dataId,info)
    if(dataId) {
    setInfo(getInfo(dataId))
    }
  }, [dataId])


  

  // libraries: API的名稱, key()是從key.js來的
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key(),
    libraries,
  });

  if (!isLoaded) {
    return <div>loading</div>;
  }

  // 渲染畫面
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* 當取得停車場的id時，才渲染卡片。info是物件，不能用info.length */}
      {info.id && <Information data={info} />}
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
        onLoad={(map) => setMap(map)}
      >
        {/* 印出想要的Marker */}
        <Marker position={position} draggable={true} />
        {data.map((park) => {
          if (park.area === "萬華區" && park.remainingCar > 0) {
            return (
              <Marker
                icon={{
                  url: marker,
                }}
                label={`$${ park.FareInfo }`}
                key={park.id}
                onClick={() => {
                  setDataId(park.id)
                }}
                position={convertProj4(park.tw97x, park.tw97y)}
              />
            );
          } else if (park.area === "萬華區" && !park.remainingCar) {
            return (
              <Marker
                icon={{
                  url: markerZero,
                }}
                label={`$${ park.FareInfo }`}
                key={park.id}
                onClick={() => {
                  setDataId(park.id)
                }}
                position={convertProj4(park.tw97x, park.tw97y)}
              />
            );
          }
        })}
      </GoogleMap>
    </div>
  );
}

export default Parking;
