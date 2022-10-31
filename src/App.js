import Parking from "./pages/Parking";
import Payment from "./pages/Payment";
import Account from "./pages/Account"
import Setting from "./pages/Setting"
import { Route, Routes } from "react-router-dom"
import SideBar from "./components/SideBar";

function App() {
  return (
    <div style={{ postition:"relative" }}>
      <SideBar />
      <div>
        <Routes>
          <Route exact path="/" element={<Parking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/account" element={<Account />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
