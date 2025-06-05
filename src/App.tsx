import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import NavBar from "./componenet/NavBar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import LogIn from "./pages/LogIn";
import SearchHo from "./pages/SearchHo";
import Calculator from "./pages/Calculator";
import Footer from "./componenet/Footer";
import SideBar from "./componenet/SideBar";
import AddCard from "./pages/AddCard";
import { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/slices/authSlice";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";

import "react-loading-skeleton/dist/skeleton.css";

import Charts from "./pages/Charts";
import UserManagment from "./componenet/UserManagment";
import ShiemmerAll from "./componenet/ShiemmerAll";

function App() {
  const isOpen = useSelector((state: RootState) => state.SideBar.isOpen);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(checkAuth());
  }, [dispatch]);

    const [status, setStatus] = useState("");
  const [loading2, setLoading2] = useState(true);
  useEffect(() => {
    const pingServer = async () => {
      try {
        setLoading2(true);
        setStatus("⏳ קןרא לשרת  ...");
        await axios.get("https://backendics.onrender.com/api/keep-alive"); // غيّر هذا للرابط الفعلي
        setStatus("✅ ready!");
      } catch (e) {
        // setStatus("⚠️ تعذر الوصول إلى الخادم.");
      } finally {
        setLoading2(false);
      }
    };

    pingServer();
  }, []);


 
  const loading1 = useSelector((state: RootState) => state.auth.loading1);

  return (
    <>
      <NavBar />
      {isOpen && <SideBar />}

      {loading1  || loading2 ? (
        <ShiemmerAll />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchHo />} />
          <Route
            path="/profile"
            element={!isLoggedIn ? <Navigate to="/" replace /> : <Profile />}
          />
          <Route
            path="/addcard"
            element={!isLoggedIn ? <Navigate to="/" replace /> : <AddCard />}
          />
          <Route path="/calculator" element={<Calculator />} />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <LogIn />}
          />
          <Route
            path="/charst"
            element={
              !isLoggedIn && user?.username !== "admin1" ? (
                <Navigate to="/" replace />
              ) : (
                <Charts />
              )
            }
          />
          <Route
            path="/users-management"
            element={
              !isLoggedIn && user?.username !== "admin1" ? (
                <Navigate to="/" replace />
              ) : (
                <UserManagment />
              )
            }
          />
        </Routes>
      )}

      <Footer />

      <ToastContainer position="bottom-left" autoClose={3000} />
      {/* 
      <Route path="/notFound"></Route> */}
    </>
  );
}

export default App;
