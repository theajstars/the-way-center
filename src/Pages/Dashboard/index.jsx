import { useState, useEffect, useContext, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

import Application from "../Application";
import Footer from "../Footer";
import Home from "../Home";
import SideNav from "../SideNav";
import TopNav from "../TopNav";
import { PerformRequest } from "../../API/PerformRequests";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import MegaLoader from "../Megaloader";
import Reports from "../Reports";
import Profile from "../Profile";
import Messages from "../Messages";
import Media from "../Media";

const initialContext = {
  CountriesList: [],
  Notifications: {
    unread: 0,
    requests: 0,
  },
  Tribes: [],
  Religions: [],
  Profile: {
    token: "",
    lastname: "",
    firstname: "",
    middlename: "",
    email: "",
    phone: "",
    accountCode: "",
    accountConnected: "",
    details: {
      primary: {
        lastname: "",
        firstname: "",
        email: "",
        phone: "",
        image: "",
      },
      spouse: {
        lastname: "",
        firstname: "",
        email: "",
        phone: "",
        image: "",
      },
      pair: {
        count: null,
        details: {
          status: "",
          surrogate: {
            lastname: "",
            firstname: "",
            email: "",
            phone: "",
            image: "",
          },
        },
      },
    },
  },

  refetchData: () => {},
};
const DefaultContext = createContext(initialContext);

function ShowToast({ isLoggedIn, firstname, lastname }) {
  const toast = useToast();

  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "Login Successful.",
        description: `Welcome to your dashboard ${firstname} ${lastname}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }, 1500);
  }, []);
}
export default function Dashboard() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  const [profile, setProfile] = useState(initialContext.Profile);
  const [notifications, setNotifications] = useState(
    initialContext.Notifications
  );
  const [religions, setReligions] = useState([]);
  const [tribes, setTribes] = useState([]);

  const getCountries = async () => {
    const r = await PerformRequest.GetCountries();
    if (r.data.response_code === 200) {
      setCountries(r.data.data);
    }
  };

  const getTribes = async () => {
    const r = await PerformRequest.GetTribes();
    if (r.data.response_code === 200) {
      setTribes(r.data.data);
    }
  };
  const getReligions = async () => {
    const r = await PerformRequest.GetReligions();
    if (r.data.response_code === 200) {
      setReligions(r.data.data);
    }
  };
  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const r = await PerformRequest.GetProfile();

    setProfile(r.data.data ?? initialContext.Profile);
    if (r.data.status === "failed") {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      if (r.data.data.accountConnected === "Console") {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };
  const getNotifications = async () => {
    const r = await PerformRequest.GetNotificationCount();
    if (r.data.response_code === 200) {
      setNotifications(r.data.data ?? initialContext.Notifications);
    }
  };
  const FetchAllData = async () => {
    await getProfile();
    getCountries();

    getTribes();
    getReligions();
    getNotifications();
  };
  useEffect(() => {
    FetchAllData();
  }, []);
  return (
    <>
      {profile.token && profile.token.length > 0 ? (
        <DefaultContext.Provider
          value={{
            ...initialContext,
            CountriesList: countries,
            refetchData: FetchAllData,
            Tribes: tribes,
            Religions: religions,
            Profile: profile,
            Notifications: notifications,
          }}
        >
          <ChakraProvider>
            <ShowToast
              firstname={profile.firstname ?? ""}
              lastname={profile.lastname ?? ""}
            />
          </ChakraProvider>
          <TopNav />
          <SideNav />
          <Container maxWidth="xl">
            <div className="dashboard-component">
              <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/application" index element={<Application />} />
                <Route path="/reports" index element={<Reports />} />
                <Route path="/profile" index element={<Profile />} />
                <Route path="/messages" index element={<Messages />} />
                <Route path="/media" index element={<Media />} />
              </Routes>

              <Footer />
            </div>
          </Container>
        </DefaultContext.Provider>
      ) : (
        <MegaLoader />
      )}
    </>
  );
}

export { DefaultContext };
