import { useDispatch } from 'react-redux';
import Icons from "../assets/images/icons"

function Information({data}) {
  const dispatch = useDispatch()

  // 不同情況dispatch不同type
  const myPositionHandler = () => {
    dispatch({ type: 'myPosition'})
  }

  return (
    <div className="info_card">
      <div className="info__position">
        <Icons.SVGPosition onClick={myPositionHandler} />
      </div>
      <div className="info__container">
        <div className="info__dragger">
        </div>
        <div className="info__above">
          <div className="info__above-content">
            <div className="info__above-left">
              <h3>{data.name}</h3>
              <p>總車位 {data.totalcar} 空位數 0</p>
              <p>{data.FareInfo}元/小時</p>
            </div>
            <div className="info__above-right">
              <Icons.SVGNavigator />
              <div>立即導航</div>
            </div>
          </div>
        </div>
        <hr/>
        <div className="info__below">
          <div className="info__below-detail">
            <p>營業時間： {data.serviceTime}</p>
            <p>費率： {data.payex}</p>
            <p>地址： {data.area + data.address} </p>
            <p>聯絡電話： 02-{data.tel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Information
