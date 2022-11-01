import Parking from "./pages/Parking";
import Payment from "./pages/Payment";
import Account from "./pages/Account";
import Setting from "./pages/Setting";
import { HashRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";

function App() {
  const page = (children, page) => {
    return (
      <>
        <SideBar />
        {children}
      </>
    );
  };

  return (
    <div style={{ postition: "relative" }}>
      <div>
        <HashRouter>
          <Routes>
            <Route exact path="/" element={page(<Parking />, "parking")} />
            <Route path="/payment" element={page(<Payment />, null)} />
            <Route path="/account" element={page(<Account /> ,null)} />
            <Route path="/setting" element={page(<Setting />, null)} />
            <Route path="*" element={page(<Parking />)} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
