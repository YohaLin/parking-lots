import Icons from "../assets/images/icons";
import renderText from "../helpers/calcTextLength"; // 不能讓文字超過框框
import Toast from "../helpers/sweetAlert"
import { parkingActions, searchActions, filterActions } from "../store/store";
import { useSelector, useDispatch } from "react-redux";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useEffect } from "react";

function SearchBar() {
  // 從套件抓取資料
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const dispatch = useDispatch();
  const searchLatLng = useSelector((state) => state.search.searchLatLng);
  const district = useSelector((state) => state.filter.district);
  const showFilter = useSelector((state) => state.filter.showFilter);

  // 選擇地點後會印出經緯度
  const handleSelect = async (val) => {
    try {
      if (ready) {
        setValue(val); // 點選地點後，將結果印在搜尋框中
        clearSuggestions();

        const results = await getGeocode({ address: value });
        const { lat, lng } = await getLatLng(results[0]);
        dispatch(searchActions.getSearchLatLng({ lat, lng }));
        setValue("");
      }
    } catch (error) {
      Toast.fire({
        title: "找不到此處，請重新輸入",
        icon: "error"
      })
      setValue("");
    }
  };

  // 渲染搜尋後的推薦清單
  const RenderSearchList = () => {
    // 沒有在篩選框點選時可以列出list
    if (!district) {
      return data.map(({ place_id, description }) => {
        return (
          <div className="search__input-list" key={place_id}>
            <Icons.SVGParking className="search__input-list_SVGParking" />
            {/* 不能讓文字超過框框 */}
            <div className="search__input-list_description">
              {renderText(description, 48)}
            </div>
          </div>
        );
      });
    }
    // 當從篩選框點選地區時，會把地點印在搜尋框上面，但不能渲染list
    return
  };

  // 可以刪除輸入的字和區域上的Marker
  function clearSearchText() {
    dispatch(filterActions.removeDistrict());
    setValue("");
  }

  //  點擊上一部按鈕時，清空info, dataId, searchLatLng
  function handleLastStep() {
    dispatch(parkingActions.removeDataId());
    dispatch(parkingActions.removeInfo());
    dispatch(searchActions.removeSearchLatLng({ lat: "", lng: "" }));
    dispatch(filterActions.removeDistrict());
    setValue("");
  }

  // 當從篩選框點選地區時，會把地點印在搜尋框上面，但不能渲染list
  useEffect(()=> {
    if(district){
      setValue(district);
    }else{
      setValue("")
    }
    return
  }, [district])

  return (
    <form className="search__container">
      <div className="search__input-container">
        <div className="search__input">
          <input
            value={value}
            type="text"
            placeholder="篩篩車吧！"
            onChange={(e) => setValue(e.target.value)}
          />
          <div
            className="search__input-lists"
            onClick={(e) => {
              // 不能用e.target.value!!!!!!!!!!!!!!!
              handleSelect(e.target.innerText);
            }}
          >
            {status === "OK" && value && <RenderSearchList />}
          </div>
        </div>
        {value && (
          <Icons.SVGClearText
            className="search__input-clearText"
            onClick={clearSearchText}
          />
        )}
        {/* <Icons.SVGFind className="search__input-find" /> */}
        <button>
          <Icons.SVGLastStep
          className="search__input-lastStep"
          onClick={handleLastStep}
        />
        </button>
        <button className="search__input-filter">
          <Icons.SVGFilter onClick={() => {
            if(showFilter){
              return dispatch(filterActions.notShowFilter());
            }else{
              return dispatch(filterActions.showFilter());
            }
          }} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
