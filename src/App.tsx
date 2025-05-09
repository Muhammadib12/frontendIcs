import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./componenet/NavBar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import LogIn from "./pages/LogIn";
import SearchHo from "./pages/SearchHo";
import Calculator from "./pages/Calculator";
import Footer from "./componenet/Footer";

import SideBar from "./componenet/SideBar";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";

function App() {
  const isOpen = useSelector((state: RootState) => state.SideBar.isOpen);

  return (
    <>
      <NavBar />

      {isOpen && <SideBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchHo />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
