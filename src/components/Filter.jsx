import Icons from "../assets/images/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  filterActions
} from "../store/store";

function Filter() {
  const dispatch = useDispatch();
  const showFilter = useSelector((state) => state.filter.showFilter);
  const district = useSelector((state) => state.filter.district);

  const District = ["松山區", "信義區", "大安區", "中山區", "中正區", "大同區", "萬華區", "文山區", "南港區", "士林區", "內湖區", "北投區",];

  // 點選想要的區域
  function handleClick(District) {
    dispatch(filterActions.getDistrict(District))
    dispatch(filterActions.notShowFilter()) // 選完之後要把篩選框關掉
  }

  // 點擊上一步按鈕可以關掉篩選框
  function closeFilter(){
    dispatch(filterActions.notShowFilter())
  }

  const RenderDistrictButton = District.map((District) => {
    return (
      <li key={District} className="filter__button-items">
        <button className="filter__button-item" onClick={(e) => { 
          e.preventDefault()
          handleClick(District) 
          }}>
          <Icons.SVGParking />
          {District}
        </button>
      </li>
    );
  });

  console.log(district)




  return (
    <div className="filter">
      <form className="filter__container" >
        <Icons.SVGLastStep className="filter__SVGLastStep" onClick={closeFilter}/>
        <h2>從區域找：</h2>
        <ul className="filter__button-container">{RenderDistrictButton}</ul>
      </form>
    </div>
  );
}

export default Filter;
