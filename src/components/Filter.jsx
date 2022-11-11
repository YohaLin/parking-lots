import Icons from "../assets/images/icons";
import { useSelector, useDispatch } from "react-redux";
import { filterActions, parkingActions } from "../store/store";

function Filter() {
  const dispatch = useDispatch();
  const showFilter = useSelector((state) => state.filter.showFilter);
  const showRemaining = useSelector((state) => state.filter.showRemaining);
  const district = useSelector((state) => state.filter.district);
  const customizedMapStyle = useSelector((state) => state.parking.customizedMapStyle);

  const District = [
    "松山區",
    "信義區",
    "大安區",
    "中山區",
    "中正區",
    "大同區",
    "萬華區",
    "文山區",
    "南港區",
    "士林區",
    "內湖區",
    "北投區",
  ];

  const RenderDistrictButton = District.map((District) => {
    return (
      <li key={District} className="filter__button-items">
        <button
          className="filter__button-item"
          onClick={(e) => {
            e.preventDefault();
            dispatch(filterActions.getDistrict(District));
          }}
        >
          <Icons.SVGParking />
          {District}
        </button>
      </li>
    );
  });

  return (
    <div className="filter">
      <button className="filter__header-container">
        <Icons.SVGLastStepInFilter
          className="filter__header-SVGLastStep"
          onClick={(e) => {
            e.preventDefault()
            dispatch(filterActions.notShowFilter());
          }}
        />
      </button>
      <form className="filter__container"><h2>地圖樣式：</h2>
        <ul className="filter__button-container remaining">
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(parkingActions.toggleMapStyle());
              }}
              className={
                customizedMapStyle
                  ? "filter__button-showRemaining"
                  : "filter__button-unactive"
              }
            >
              {customizedMapStyle? "Clean Mode" : "Google Map"}
            </button>
          </li>
        </ul>
        <h2>顯示剩餘車位：</h2>
        <ul className="filter__button-container remaining">
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(filterActions.showRemaining());
              }}
              className={
                showRemaining
                  ? "filter__button-showRemaining"
                  : "filter__button-unactive"
              }
            >
              是
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(filterActions.notShowRemaining());
              }}
              className={
                !showRemaining
                  ? "filter__button-notShowRemaining"
                  : "filter__button-unactive"
              }
            >
              否
            </button>
          </li>
        </ul>
        <h2>從區域找：{district ? `「${district}」` : ""}</h2>
        <ul className="filter__button-container">{RenderDistrictButton}</ul>
      </form>
      <div className="filter__button-cancel-container">
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(filterActions.removeDistrict());
            dispatch(filterActions.notShowRemaining());
            dispatch(parkingActions.removeInfo());
          }}
          className="filter__button-cancel"
        >
          取消選取
        </button>
      </div>
    </div>
  );
}

export default Filter;
