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
            <Home setlogin={setlogin} setlogout={setlogout} loginState={true} />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              setlogin={setlogin}
              setlogout={setlogout}
              loginState={false}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/historyPage" element={<HistoryPage />} />
        <Route
          path="/restaurants/:city"
          element={<RestaurantPage setlogin={setlogin} setlogout={setlogout} />}
        />
        <Route
          path="/restaurants/:city/:restaurantName"
          element={<RestaurantDetailsPage restaurantData={restaurantData} />}
        />
        {/* 其他路由 */}
        <Route
          path="/payment"
          element={<PaymentPage setlogin={setlogin} setlogout={setlogout} />}
        />
        <Route
          path="/delivery"
          element={<DeliveryPage setlogin={setlogin} setlogout={setlogout} />}
        />
        <Route
          path="/takeway"
          element={<TakewayPage setlogin={setlogin} setlogout={setlogout} />}
        />

        <Route
          path="/fooddeliverypage"
          element={
            <FoodDeliveryPage
              setlogin={setlogin}
              setlogout={setlogout}
              restaurantData={restaurantData}
            />
          }
        />

        <Route path="/groceries/:storeName" element={<GroceriesDetailPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
