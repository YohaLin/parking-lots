import { Link } from "react-router-dom";
import Icons from "./../assets/images/icons";
function SideBar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/parking-lots/">
            <div className="link-container">
              <Icons.SVGParking />
              <span>停車場</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/parking-lots/payment">
            <div className="link-container" >
              <Icons.SVGPayment  />
              <span>支付</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/parking-lots/account">
            <div className="link-container">
              <Icons.SVGAccount />
              <span>帳號</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/parking-lots/setting">
            <div className="link-container">
              <Icons.SVGSetting />
              <span>設定</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}


export default SideBar;
