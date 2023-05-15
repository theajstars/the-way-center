import { useState, useRef, useContext, useEffect } from "react";

import { Typography, Modal, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import {
  ReportCategories,
  SurrogateRecords,
  SurrogateReports,
} from "../../Assets/Data";

import AishaAvatar from "../../Assets/IMG/AishaAvatar.svg";
import DefaultAvatar from "../../Assets/IMG/DefaultAvatar.jpg";
import PurpleFlower from "../../Assets/IMG/PurpleFlower.svg";
import YoutubeEmbed from "../YoutubeEmbed";
import AccountManagement from "../AccountManagement";
import Footer from "../Footer";
import { DefaultContext } from "../Dashboard";
import SurrogateProfileView from "../SurrogateProfileView";
import { PerformRequest } from "../../API/PerformRequests";
import { Link } from "react-router-dom";

export default function Home() {
  const ConsumerContext = useContext(DefaultContext);
  const getSurrogateDetails = () => {
    if (ConsumerContext.Profile.details.pair) {
      if (ConsumerContext.Profile.details.pair.details.surrogate) {
        return ConsumerContext.Profile.details.pair.details.surrogate;
      }
    }
  };
  const ModifySurrogatesRef = useRef();
  const [SurrogateRecordsToDisplay, setSurrogateRecordsToDisplay] = useState(
    SurrogateRecords.slice(0, 4)
  );
  const ModifySurrogateRecordsToDisplay = () => {
    if (SurrogateRecordsToDisplay.length === SurrogateRecords.length) {
      setSurrogateRecordsToDisplay(SurrogateRecords.slice(0, 4));
    } else {
      setSurrogateRecordsToDisplay(SurrogateRecords);
    }
  };

  const [surrogateReportModalDetails, setSurrogateReportModalDetails] =
    useState({ state: false, content: null });

  const screenWidth = window.innerWidth;
  console.log(screenWidth);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [surrogateReports, setSurrogateReports] = useState([]);
  const getReportCategory = (category) => {
    const f = ReportCategories.filter((c) => c.value === category);
    if (f.length === 0) {
      return "Medical";
    } else {
      return f[0].name;
    }
  };
  const fetchSurrogateReports = async () => {
    // const surrogateID = getSurrogateDetails()
    const r = await PerformRequest.GetReports({});
    console.log(r);
    setSurrogateReports(r.data.status === "success" ? r.data.data : []);
  };
  useEffect(() => {
    fetchSurrogateReports();
  }, []);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: screenWidth > 1400 ? 3 : screenWidth > 900 ? 2 : 1,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  const getSurrogateOverviewCount = () => {
    if (screenWidth > 1450) {
      return 3;
    } else {
      return 2;
    }
  };

  const [showSurrogateProfile, setShowSurrogateProfile] = useState(false);
  return (
    <div className="home-page">
      <Typography className="poppins fw-500" variant="h5">
        PARENT DASHBOARD
      </Typography>
      <br />
      {showSurrogateProfile && (
        <SurrogateProfileView
          showSurrogateProfile={(value) => {
            setShowSurrogateProfile(value);
          }}
        />
      )}
      <div className="home-container flex-row">
        <div className="home-container-left flex-column">
          <img
            src={getSurrogateDetails().image ?? DefaultAvatar}
            alt=""
            className="home-avatar pointer"
            onClick={() => {
              setShowSurrogateProfile(true);
            }}
          />
          <span className="home-username fw-500 cinzel px-23">
            {getSurrogateDetails().firstname ?? "No Surrogate"} &nbsp;
            {getSurrogateDetails().lastname ?? "Assigned"}
          </span>
          <span className="home-usertag poppins px-16 fw-500">
            My Surrogate
          </span>
          <br />
          <hr className="home-divider" />
          <br />
          {/* <motion.div
            initial={false}
            animate={{
              maxHeight:
                SurrogateRecords.length === SurrogateRecordsToDisplay.length
                  ? "100%"
                  : "fit-content",
            }}
            className="surrogate-record-overview flex-column"
          >
            <span className="fw-500 black-default-text poppins px-19">
              Surrogate Record
            </span>
            {SurrogateRecordsToDisplay.map((record, index) => {
              return (
                <div
                  className="flex-row surrogate-record-overview-item"
                  key={index}
                >
                  <div className="flex-row surrogate-record-overview-icon">
                    <img
                      src={PurpleFlower}
                      className="surrogate-record-overview-image"
                      alt=""
                    />
                  </div>
                  &nbsp; &nbsp; &nbsp;
                  <span className="surrogate-record-overview-text flex-column">
                    <span className="fw-500 poppins px-15 ">
                      {record.title}{" "}
                      <span className="fw-600">{record.important}</span>
                    </span>
                    <span className="poppins fw-400 gray-primary-text px-14">
                      {record.time} ago
                    </span>
                  </span>
                </div>
              );
            })}
          </motion.div> */}
          {/* <span
            className="more-surrogates black-default-text px-20 flex-row"
            onClick={ModifySurrogateRecordsToDisplay}
            ref={ModifySurrogatesRef}
          >
            <motion.span
              initial={false}
              animate={{
                rotate:
                  SurrogateRecords.length === SurrogateRecordsToDisplay.length
                    ? "0deg"
                    : "180deg",
              }}
            >
              <i className={`far fa-long-arrow-alt-up`}></i>
            </motion.span>
          </span> */}
        </div>

        <div className="home-container-right flex-column">
          <div className="flex-row space-between align-center">
            <span className="poppins fw-500 px-18 surrogate-reports-head">
              Your Surrogate Reports
              {/* Your Surrogate Reports from TWC */}
            </span>
            <Link
              to="/dashboard/reports"
              className="poppins fw-500 px-16 purple-default-text view-more-reports"
            >
              View More
            </Link>
          </div>
          <Modal
            open={surrogateReportModalDetails.state}
            onClose={(e, reason) => {
              if (reason === "backdropClick") {
                setSurrogateReportModalDetails({
                  ...surrogateReportModalDetails,
                  state: false,
                });
              }
            }}
            className="default-modal-container flex-row"
          >
            <div className="default-modal-content surrogate-report-modal flex-column">
              <div className="flex-row align-center">
                <div className="flex-column">
                  <span className="cinzel px-19 capitalize">
                    {surrogateReportModalDetails.content?.parent.firstname}
                    &nbsp;
                    {surrogateReportModalDetails.content?.parent.lastname}
                  </span>
                  <span className="cinzel px-19 surrogate-report-title">
                    {surrogateReportModalDetails.content?.title}
                  </span>
                </div>
                &nbsp; &nbsp; &nbsp;
                <img
                  src={surrogateReportModalDetails.content?.parent.image}
                  alt=""
                  className="surrogate-report-avatar"
                />
              </div>
              <br />
              <span className="fw-700 cinzel px-19">FULL REPORT</span>

              <br />
              <span className="fw-600 poppins px-19 underline">
                {getReportCategory(
                  surrogateReportModalDetails.content?.reportCategory
                )}{" "}
                Report
              </span>
              <br />
              <div className="flex-row align-center">
                <span className="fw-400 poppins px-16">Surrogate: &nbsp;</span>
                <span className="fw-700 poppins px-16 capitalize">
                  {surrogateReportModalDetails.content?.surrogate.firstname}
                  &nbsp;
                  {surrogateReportModalDetails.content?.surrogate.lastname}
                </span>
              </div>
              <br />
              <div className="flex-row align-center">
                <span className="fw-400 poppins px-16">
                  Health Practitioner: &nbsp;
                </span>
                <span className="fw-700 poppins px-16">
                  {surrogateReportModalDetails.content?.healthPractitioner}
                </span>
              </div>
              <br />
              <div className="flex-row align-center">
                <span className="fw-400 poppins px-16">
                  Health Center: &nbsp;
                </span>
                <span className="fw-700 poppins px-16">
                  {surrogateReportModalDetails.content?.healthCenter}
                </span>
              </div>
              <br />
              <span className="px-15 gray-secondary-text poppins full-surrogate-report-body modal-scrollbar">
                {surrogateReportModalDetails.content?.details}
              </span>
              <div className="flex-row surrogate-report-modal-footer">
                <span
                  className="close-surrogate-report poppins flex-row pointer"
                  onClick={() => {
                    setSurrogateReportModalDetails({
                      ...surrogateReportModalDetails,
                      state: false,
                    });
                  }}
                >
                  Exit
                </span>
              </div>
            </div>
          </Modal>
          <div className="surrogate-reports flex-row space-between">
            {surrogateReports.map((report, index) => {
              if (index === 0 || index === 1) {
                return (
                  <div className="surrogate-report flex-column">
                    <div className="flex-row surrogate-report-top space-between">
                      <div className="flex-column">
                        <span className="cinzel px-14 gray-secondary-text surrogate-report-type">
                          {report.parent.firstname} {report.parent.lastname}
                        </span>
                        <span className="cinzel px-16 surrogate-report-title">
                          {getReportCategory(report.reportCategory)} Report
                        </span>
                      </div>
                      <img
                        src={report.parent.image}
                        alt=""
                        className="surrogate-report-avatar"
                      />
                    </div>
                    <span className="surrogate-report-body poppins px-14 fw-300">
                      {report.details.length > 120
                        ? `${report.details.substring(0, 120)}...`
                        : report.details}
                    </span>
                    <div className="flex-row space-between">
                      <span className="flex-column">
                        <span
                          className={`surrogate-report-verdict flex-row poppins fw-500 px-13 surrogate-report-satisfactory`}
                          // className={`surrogate-report-verdict flex-row poppins fw-500 px-13 surrogate-report-${report.verdict.toLowerCase()}`}
                        >
                          Satisfactory
                          {/* {report.verdict} */}
                        </span>
                        <small className="px-10 fw-500 poppins">
                          Doctor’s Overall Remark
                        </small>
                      </span>

                      <span
                        className="px-14 poppins fw-500 pointer"
                        onClick={() => {
                          setSurrogateReportModalDetails({
                            state: true,
                            content: report,
                          });
                        }}
                      >
                        <u>View Full Report</u>
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <span className="poppins fw-500 px-18">Your Surrogate Media</span>
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide surrogate-media-item">
              <YoutubeEmbed embedId={"CuSxk_DNau8"} />
            </div>
            <div className="keen-slider__slide surrogate-media-item">
              <YoutubeEmbed embedId={"CuSxk_DNau8"} />
            </div>
            <div className="keen-slider__slide surrogate-media-item">
              <YoutubeEmbed embedId={"CuSxk_DNau8"} />
            </div>
            <div className="keen-slider__slide surrogate-media-item">
              <YoutubeEmbed embedId={"CuSxk_DNau8"} />
            </div>
          </div>
          <br />
          {loaded && instanceRef.current && (
            <center>
              <span
                className="px-30 pointer surrogate-media-arrow"
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              >
                <i className="fas fa-long-arrow-alt-left"></i>
              </span>

              <span
                className="px-30 pointer surrogate-media-arrow"
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              >
                <i className="fas fa-long-arrow-alt-right"></i>
              </span>
            </center>
          )}
          <AccountManagement />
        </div>
      </div>
    </div>
  );
}
