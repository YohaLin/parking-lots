import Icons from "../assets/images/icons"
import Position from "./../components/Position"

function Information({data}) {
  return (
    <div className="info__card">
      <div className="info__position">
        <Position />
      </div>
      <div className="info__container">
        <div className="info__dragger">
        </div>
        <div className="info__above">
          <div className="info__above-content">
            <div className="info__above-left">
              <h3>{data.name}</h3>
              <p>總車位 {data.totalcar} 空位數 {data.remainingCar}</p>
              <p>{data.FareInfo}元/小時</p>
            </div>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${data.name},${data.address !== "無地址資料"? data.address:""}` }className="info__above-right" >
              <Icons.SVGNavigator />
              <div style={{color: "#07B53B"}}>立即導航</div>
            </a>
          </div>
        </div>
        <hr/>
        <div className="info__below">
          <div className="info__below-detail">
            <p>營業時間： {data.serviceTime}</p>
            <p>費率： {data.payex}</p>
            <p>區域： {data.area} </p>
            <p>地址： {data.address} </p>
            <p>聯絡電話： 02-{data.tel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Information
