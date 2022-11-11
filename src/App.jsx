import Parking from "./pages/parking";
import About from "./pages/About";
import { HashRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import NotFound from "./pages/NotFound";

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
            <Route path="/" element={page(<Parking />, "parking")} />
            <Route path="/parking" element={page(<Parking />, "parking")} />
            <Route path="/about" element={page(<About /> ,null)} />
            <Route path="*" element={page(<NotFound />)} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
