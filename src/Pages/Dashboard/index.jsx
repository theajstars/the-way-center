import { useState, useEffect, useContext, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import Application from "../Application";
import Footer from "../Footer";
import Home from "../Home";
import SideNav from "../SideNav";
import TopNav from "../TopNav";
import { PerformRequest } from "../../API/PerformRequests";

const initialContext = {
  CountriesList: [],
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
  },
  Metrics: {
    parent: undefined,
    surrogate: undefined,
    pairing: undefined,
  },

  refetchData: () => {},
};
const DefaultContext = createContext(initialContext);

export default function Dashboard() {
  const [countries, setCountries] = useState([]);

  const [profile, setProfile] = useState();

  const [religions, setReligions] = useState([]);
  const [tribes, setTribes] = useState([]);

  const [metrics, setMetrics] = useState({
    ...initialContext.Metrics,
    set: false,
  });
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
  const getMetrics = async () => {
    const r = await PerformRequest.GetMetrics();
    if (r.data.response_code === 200) {
      setMetrics({ ...r.data.data, set: true });
    }
  };
  const getProfile = async () => {
    const r = await PerformRequest.GetProfile();
    console.log(r);
    setProfile(r.data.data ?? initialContext.Profile);
  };

  const FetchAllData = async () => {
    getCountries();

    getMetrics();

    getTribes();
    getReligions();
    getProfile();
  };
  useEffect(() => {
    FetchAllData();
  }, []);
  return (
    <>
      <DefaultContext.Provider
        value={{
          ...initialContext,
          CountriesList: countries,

          Metrics: metrics,

          refetchData: FetchAllData,
          Tribes: tribes,
          Religions: religions,
          Profile: profile,
        }}
      >
        <TopNav />
        <SideNav />
        <Container maxWidth="xl">
          <div className="dashboard-component">
            <Routes>
              <Route path="/" index element={<Home />} />
              <Route path="/application" index element={<Application />} />
            </Routes>

            <Footer />
          </div>
        </Container>
      </DefaultContext.Provider>
    </>
  );
}

export { DefaultContext };
