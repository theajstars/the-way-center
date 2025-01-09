import { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";

import Login from "./Pages/Login";

import "./Assets/CSS/All.css";
import ForgotPassword from "./Pages/ForgotPassword";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import Application from "./Pages/Application";
import Reports from "./Pages/Reports";
import Profile from "./Pages/Profile";
import Messages from "./Pages/Messages";
import Media from "./Pages/Media";
import ParentUpdate from "./Pages/ParentUpdate";
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateBVN(bvn) {
  if (isNaN(parseInt(bvn[0])) || parseInt(bvn[0]) === 0) {
    return false;
  } else {
    if (bvn.length !== 11) {
      return false;
    } else {
      return true;
    }
  }
}
function validateNIN(nin) {
  if (isNaN(parseInt(nin[0])) || parseInt(nin[0]) === 0) {
    return false;
  } else {
    if (nin.length !== 11) {
      return false;
    } else {
      return true;
    }
  }
}
function getFullDate(dateString) {
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date(dateString);
  const m = month[d.getMonth()];
  const date = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();

  return `${m} ${date}, ${hour}:${minute}`;
}

function App() {
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (!token) {
  //     window.location.href = "/login";
  //   } else {
  //     // Send to dashboard
  //   }
  // }, []);

  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          {/* <Route path="/dashboard/application" element={<Application />} /> */}
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/edit-profile" element={<ParentUpdate />} />
          <Route path="/dashboard/media" element={<Media />} />
          <Route path="/dashboard/messages" element={<Messages />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
export { validateEmail, validateBVN, validateNIN, getFullDate };
