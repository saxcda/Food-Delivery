import React, { useState, useEffect } from "react";
import CityGrid from "./components/CityGrid";
import RestaurantGrid from "./components/RestaurantGrid";
import NavigationBreadcrumbs from "./components/NavigationBreadcrumbs";
import RestaurantDetails from "./components/RestaurantDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Location from "./components/Location";
import Join_foodpanda from "./components/Join_foodpanda";
import Know_more from "./components/Know_more";
import Download from "./components/Download";
import Note_foodpanda from "./components/Note_foodpanda";
import FoodDeliveryPage from "./Pages/FoodDeliveryPage";
import RestaurantPage from "./components/RestaurantPage";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage";
import Profile from "./components/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import LoginDialog from "./auth/LoginDialog";
import EmailConfirm from "./auth/EmailConfirm";
import HaveEmail from "./auth/HaveEmail";
import NotHaveEmail from "./auth/NotHaveEmail";
// import PaymentPage from "./Pages/PaymentPage1";
import PaymentPage from "./Pages/PaymentPage";
import { PiReadCvLogoFill } from "react-icons/pi";
import DeliveryPage from "./Pages/DeliveryPage";
import HistoryPage from "./components/HistoryPage";
import HistoryPageDetail from "./components/HistoryPageDetail";
import TakewayPage from "./Pages/TakewayPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import GroceriesDetailPage from "./Pages/GroceriesDetailPage";
import Register from "./auth/Register";

import AreaPage from "./components/AreaPage";

// const ProtectedRoute = ({ loginState, element }) => {
//   const [open, setOpen] = useState(!loginState);

//   const handleClose = () => {
//     setOpen(false);
//     window.location.href = "/login"; // 跳转到登录页面
//   };

//   if (!loginState) {
//     return (
//       <>
//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>提醒</DialogTitle>
//           <DialogContent>您尚未登入，請先登入再繼續。</DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               確定
//             </Button>
//           </DialogActions>
//         </Dialog>
//         {/* 避免渲染其他内容 */}
//       </>
//     );
//   }

//   return element;
// };

const App = () => {
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/restaurants");
        const data = await response.json();
        setRestaurantData(data);
      } catch (err) {
        console.error("Error fetching restaurant data:", err.message);
      }
    };

    fetchData();
  }, []);

  const [loginState, setLoginState] = useState(false);
  const [user, setUser] = useState('')
  console.log(typeof setLoginState);

  const setlogin = () => {
    setLoginState(true);
  };

  const setlogout = () => {
    setLoginState(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loginState ? (
              <Navigate to="/login" /> // 如果已登入，重定向到 /home
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <Home setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser}/>
          }
        />
        <Route
          path="/home"
          element={
            <Home
              setlogin={setlogin}
              setlogout={setlogout}
              loginState={false}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route path="/profile" element={<Profile setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser}/>} />
        <Route path="/historyPage" element={<HistoryPage setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser}/>} />
        <Route path="/history-detail/:order_id" element={<HistoryPageDetail setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser}/>} />

        <Route 
          path="/restaurants/:city"
          element={<RestaurantPage setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser} />}
        />
        <Route
          path="/restaurants/:city/:restaurantName"
          element={<RestaurantDetailsPage restaurantData={restaurantData} setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser}/>}
        />
        {/* 其他路由 */}
        <Route
          path="/payment"
          element={<PaymentPage setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser}/>}
        />
        <Route
          path="/delivery"
          element={<DeliveryPage  setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser} />}
        />
        <Route
          path="/takeway"
          element={<TakewayPage setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser} />}
        />

        <Route
          path="/fooddeliverypage"
          element={
                <FoodDeliveryPage
                setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser}
                restaurantData={restaurantData}
                />
              }
        />

        <Route path="/area/:areaName" element={<AreaPage />} />

        <Route path="/groceries/:storeName" element={<GroceriesDetailPage setlogin={setlogin} setlogout={setlogout} loginState={true} user={user} setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
