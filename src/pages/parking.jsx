// Marker => 可以加上地標圖示
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  myPositionActions,
  parkingActions,
  filterActions,
} from "../store/store";

import Information from "../components/Information";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import key from "../key";

import convertProj4 from "../helpers/proj4"; // 將EPSG:3826 轉乘EPSG:4326
import correctDistrict from "../helpers/correctDistrict";
import distance from "../helpers/convertDistanceUnit";
import Toast from "../helpers/sweetAlert";
import mapStyles from "../helpers/mapStyles";
import centerLatLngOfDistrict from "../helpers/centerLatLngOfDistrict";

import marker from "./../assets/images/marker.svg";
import markerZero from "./../assets/images/markerZero.svg";
import clickedMarker from "./../assets/images/clickedMarker.svg";
import clickedMarkerZero from "./../assets/images/clickedMarkerZero.svg";
import Position from "../components/Position";
import IsLoaded from "../components/IsLoaded";

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
  const [position, setPosition] = useState({
    lat: 25.04,
    lng: 121.5,
  });
  const [nearbyMarkers, setNearbyMarkers] = useState([]);
  const [center, setCenter] = useState({});
  const myPosition = useSelector((state) => state.myPosition.myPosition); // boolean
  const info = useSelector((state) => state.parking.info);
  const dataId = useSelector((state) => state.parking.dataId);
  const customizedMapStyle = useSelector((state) => state.parking.customizedMapStyle);
  const searchLatLng = useSelector((state) => state.search.searchLatLng);
  const showFilter = useSelector((state) => state.filter.showFilter);
  const district = useSelector((state) => state.filter.district);
  const showRemaining = useSelector((state) => state.filter.showRemaining);

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
      Toast.fire({
        icon: "error",
        title: "取得停車場剩餘資料失敗，請重新整理再試。",
      });
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
          area: correctDistrict(park.id, park.area), // 過濾不正確的行政區資料
          name: park.name ? park.name : "無名稱資料",
          address: park.address ? park.address : "無地址資料",
          tel: park.tel ? park.tel : "無聯絡資訊",
          payex: park.payex ? park.payex : "無費率資料",
          serviceTime: park.serviceTime ? park.serviceTime : "無營業時間資料",
          LatLng: convertProj4(park.tw97x, park.tw97y),
          totalcar: park.totalcar ? park.totalcar : "?",
          FareInfo: park.FareInfo.WorkingDay
            ? park.FareInfo.WorkingDay[0].Fare
            : "?",
          remainingCar: findCar ? findCar.remainingCar : 0,
        };
      });

      setData(transformedData); // fetch data 之後就把data塞進setData
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "取得停車場資料失敗，請重新整理再試。",
      });
    }
  }

  // 使用者點擊想查詢的停車場，進行比對
  function getInfo(dataId) {
    const info = data.find((park) => {
      return park.id === dataId;
    });
    return {
      ...info,
    };
  }

  // 將距離0.6km的停車場Marker印出來
  function generateNearbyMarker(position) {
    const nearbyMarker = [];
    data.map((park) => {
      const kilometer = distance(
        position.lat,
        position.lng,
        park.LatLng.lat,
        park.LatLng.lng,
        "K"
      );
      if (kilometer < 0.6) {
        nearbyMarker.push(park);
      }
    });
    return nearbyMarker;
  }

  // 取得地圖正中間的經緯度(因為本來的資料是字串，要轉成數字)
  function getCenter(getCenter) {
    const centerLatLng = {
      lat: Number(getCenter.toJSON().lat),
      lng: Number(getCenter.toJSON().lng),
    };
    setCenter(centerLatLng);
  }
  

  // 進入網頁就定位目前的位置
  useEffect(() => {
    fetchRemainingCarHandler();
  }, []);

  // 當剩餘停車位資料出現時才fetch停車場資料，並定位
  useEffect(() => {
    fetchParkingLotsHandler();
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [remainingCar]);

  // 決定周圍停車場渲染什麼資料
  useEffect(() => {
    if (district) {
      return setNearbyMarkers([]);
    } else if (!center) {
      return setNearbyMarkers(generateNearbyMarker(position));
    }
    return setNearbyMarkers(generateNearbyMarker(center));
  }, [center]);

  // 點選行政區的時候，會自動將畫面導至該行政區
  useEffect(() => {
    if (district) {
      const FilterdDistrict = centerLatLngOfDistrict.find((data)=> {
        return data.district === district
      })
      const LatLngOfDistrict = {
        lat: FilterdDistrict.lat,
        lng: FilterdDistrict.lng,
      }
      map.panTo(LatLngOfDistrict)
      return setNearbyMarkers(generateNearbyMarker(LatLngOfDistrict));
    }
    return setNearbyMarkers(generateNearbyMarker(center));
  }, [district]);

  // 當按下定位按鈕時會改變redux裡面的state
  useEffect(() => {
    if (myPosition === true) {
      map.panTo(position);
      setNearbyMarkers(generateNearbyMarker(position));
      dispatch(myPositionActions.notMyPosition()); // 當Marker定位完之後就把狀態設為false
    }
    // eslint-disable-next-line
  }, [myPosition]);

  // 當取得使用者點擊停車場的id，會將資料放進info，並把畫面調整到該停車場
  useEffect(() => {
    if (dataId) {
      dispatch(parkingActions.getInfo(getInfo(dataId)));
      map.panTo(getInfo(dataId).LatLng)
    }
  }, [dataId]);


  // 搜尋後點選可以導至該地點
  useEffect(() => {
    if (isLoaded) {
      if (searchLatLng.lat && searchLatLng.lng) {
        map.panTo(searchLatLng);
        setNearbyMarkers(generateNearbyMarker(searchLatLng));
      } else {
        return;
      }
    }
    return;
  }, [searchLatLng]);

  // libraries: API的名稱, key()是從key.js來的
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key(),
    libraries,
  });

  if (!isLoaded) {
    return <IsLoaded />;
  }

  // 渲染畫面
  return (
    <div className="park">
      <div className="park__Position">{!info.id && <Position />}</div>
      {showFilter === true && <Filter />}
      <SearchBar />
      {/* 當取得停車場的id時，才渲染卡片。info是物件，不能用info.length */}
      {info.id && <Information data={info} />}
      <GoogleMap
        center={center ? position : center}
        zoom={17}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: customizedMapStyle? mapStyles: ""  
        }}
        onLoad={(map) => {
          setMap(map);
        }}
        onDragEnd={() => {
          getCenter(map.getCenter());
        }}
      >
        {/* 顯示附近的地標 */}
        <Marker position={position}/>
        {nearbyMarkers !== [] &&
          nearbyMarkers.map((park) => {
            if (park.remainingCar > 0 && showRemaining && park.id !== info.id) {
              return (
                <Marker
                  icon={{
                    url: marker,
                  }}
                  label={String(park.remainingCar)}
                  key={park.id}
                  onClick={() => {
                    dispatch(parkingActions.getDataId(park.id));
                    console.log(park.LatLng);
                  }}
                  position={park.LatLng}
                />
              );
            } else if (!showRemaining && park.id !== info.id) {
              return (
                <Marker
                  icon={{
                    url: park.remainingCar ? marker : markerZero,
                  }}
                  label={String(park.remainingCar)}
                  key={park.id}
                  onClick={() => {
                    dispatch(parkingActions.getDataId(park.id));
                  }}
                  position={park.LatLng}
                />
              );
            }
            return;
          })}
        {/* 當使用者點開停車場資訊，會顯示該停車場 */}
        {info.LatLng !== center && (
          <Marker
            icon={{
              url: info.remainingCar ? clickedMarker : clickedMarkerZero
            }}
            label="選取位置"
            onClick={() => {
              dispatch(parkingActions.getDataId(info.id));
            }}
            position={info.LatLng}
          />
        )}
        {/* 當使用者搜尋後，顯示該停車場 */}
        {searchLatLng && (
          <Marker
            position={{
              lat: Number(searchLatLng.lat),
              lng: Number(searchLatLng.lng),
            }}
          />
        )}
        {/* 依照行政區及剩餘車位數來顯示地標 */}
        {data.map((park) => {
          if (
            showRemaining &&
            park.area === district &&
            park.remainingCar > 0 &&
            park.id !== info.id
          ) {
            return (
              <Marker
                icon={{
                  url: marker,
                }}
                label={String(park.remainingCar)}
                key={park.id}
                onClick={() => {
                  dispatch(parkingActions.getDataId(park.id));
                }}
                position={park.LatLng}
              />
            );
          } else if (!showRemaining && park.area === district && park.id !== info.id) {
            return (
              <Marker
                icon={{
                  url: park.remainingCar ? marker : markerZero,
                }}
                label={String(park.remainingCar)}
                key={park.id}
                onClick={() => {
                  dispatch(parkingActions.getDataId(park.id));
                }}
                position={park.LatLng}
              />
            );
          }
          return;
        })}
      </GoogleMap>
    </div>
  );
}

export default Parking;
