import Icons from "../assets/images/icons";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../store/store";

function Filter() {
  const dispatch = useDispatch();
  const showFilter = useSelector((state) => state.filter.showFilter);
  const showRemaining = useSelector((state) => state.filter.showRemaining);
  const district = useSelector((state) => state.filter.district);

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


  // 點擊上一步按鈕可以關掉篩選框
  function closeFilter() {
    // 如果使用者只選擇「只顯示剩餘車位」卻沒有點選行政區，跳提醒(為了不渲染出全台北的「有剩餘車位停車場」)
    if(showRemaining && !district) {
      return alert("請選擇區域")
    } else{
      dispatch(filterActions.notShowFilter());
    }
  }

  const RenderDistrictButton = District.map((District) => {
    return (
      <li key={District} className="filter__button-items">
        <button 
          className="filter__button-item"
          onClick={(e) => {
            e.preventDefault();
            dispatch(filterActions.getDistrict(District))
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
      <form className="filter__container">
        <Icons.SVGLastStep
          className="filter__SVGLastStep"
          onClick={closeFilter}
        />
        <h2>是否只顯示剩餘車位：預設為「否」</h2>
        <ul className="filter__button-container">
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(filterActions.showRemaining());
              }}
              className={showRemaining ? "filter__button-showRemaining" : ""}
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
                !showRemaining ? "filter__button-notShowRemaining" : ""
              }
            >
              否
            </button>
          </li>
        </ul>
        <h2>從區域找：{district ? `「${district}」` : ""}</h2>
        <ul className="filter__button-container">
          {RenderDistrictButton}
        </ul>
        <button onClick={(e)=>{
          e.preventDefault()
          dispatch(filterActions.removeDistrict())
        }}>
          取消選取
        </button>
      </form>
    </div>
  );
}

export default Filter;
