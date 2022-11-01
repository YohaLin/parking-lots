import Icons from "../assets/images/icons"

function Information() {
  return (
    <div className="info_card">
      <div className="info__position">
        <Icons.SVGPosition />
      </div>
      <div className="info__container">
        <div className="info__dragger">
        </div>
        <div className="info__above">
          <div className="info__above-content">
            <div className="info__above-left">
              <h3>府前廣場地下停車場</h3>
              <p>總車位 1998 空位數 0</p>
              <p>30元/小時</p>
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
            <p>營業時間： 00:00:00~23:59:59</p>
            <p>費率： 小型車全日月票4200元，周邊里里民全日月票3360元，所在里里民全日月票2940元，夜間月票1000元(限周一至周五19-8，及周六、日與行政機關放假之紀念日、民俗日)，小型車計時30元(9-18)，夜間計時10元(18-9)；機車計時10元(當日當次上限20元)，機車月票300元。</p>
            <p>地址： 台北市信義區松壽路1號地下 </p>
            <p>聯絡電話： 02-27057716</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Information
