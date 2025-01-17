import { useState, useRef, useContext, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  Typography,
  Modal,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Alert,
} from "@mui/material";

import { useToasts } from "react-toast-notifications";

import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import {
  ReportCategories,
  SurrogateRecords,
  SurrogateReports,
} from "../../Assets/Data";

import AishaAvatar from "../../Assets/IMG/AishaAvatar.svg";
import Logo from "../../Assets/IMG/Logo.png";
import DefaultAvatar from "../../Assets/IMG/DefaultAvatar.jpg";
import PurpleFlower from "../../Assets/IMG/PurpleFlower.svg";
import YoutubeEmbed from "../YoutubeEmbed";
import AccountManagement from "../AccountManagement";
import Footer from "../Footer";
import { DefaultContext } from "../Dashboard";
import SurrogateProfileView from "../SurrogateProfileView";
import { PerformRequest } from "../../API/PerformRequests";
import { getFullDate } from "../../App";

export default function Home() {
  const ConsumerContext = useContext(DefaultContext);
  const { addToast, removeAllToasts } = useToasts();
  const getSurrogateDetails = () => {
    if (ConsumerContext.Profile.details.pair) {
      if (ConsumerContext.Profile.details.pair.details.surrogate) {
        return ConsumerContext.Profile.details.pair.details.surrogate;
      }
    } else {
      return DefaultAvatar;
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

  const [surrogateReports, setSurrogateReports] = useState([]);
  const [surrogateMedia, setSurrogateMedia] = useState([]);
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
    setSurrogateReports(
      r.data.status === "success" && r.data.data ? r.data.data : []
    );
    let reports = r.data.data;
    if (reports) {
      reports.map(async (report, index) => {
        const getMedia = await PerformRequest.GetReportFile({
          reportID: report.id,
        });
        console.log(getMedia);
        getMedia.data.data && getMedia.data.data.length !== 0
          ? // ? setSurrogateMedia([...surrogateMedia, getMedia.data.data[0]])
            setSurrogateMedia((surrogateMedia) => [
              ...surrogateMedia,
              getMedia.data.data[0],
            ])
          : addToast("Records fetching", { appearance: "info" });
      });
    }
  };
  useEffect(() => {
    fetchSurrogateReports();
    removeAllToasts();
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: window.innerWidth > 1400 ? 3 : window.innerWidth > 700 ? 2 : 1,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

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
            className="home-avatar"
            style={{
              cursor: getSurrogateDetails().firstname
                ? "pointer"
                : "not-allowed",
            }}
            onClick={() => {
              if (getSurrogateDetails().firstname) {
                setShowSurrogateProfile(true);
              }
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
        </div>

        <div className="home-container-right flex-column">
          <div className="flex-row space-between align-center view-more-row">
            <span className="poppins fw-500 px-18 surrogate-reports-head">
              Your Surrogate Reports
            </span>
            <Link
              to="/dashboard/reports"
              className="poppins fw-500 px-16 purple-default-text view-more-reports"
            >
              View More
            </Link>
          </div>
          <div className="flex-row align-center justify-center width-100">
            {surrogateReports.length === 0 && (
              <>
                <br />
                <Alert severity="info">No reports found!</Alert>
              </>
            )}
          </div>
          <div className="surrogate-reports flex-row space-between">
            {surrogateReports.map((report, index) => {
              if (index === 0 || index === 1) {
                return (
                  <div className="surrogate-report home-surrogate-report flex-column">
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
          <div className="flex-row align-center justify-between width-100">
            <span className="poppins fw-500 px-18">Your Surrogate Media</span>
            <Link to="/dashboard/media">View All</Link>
          </div>
          <br />
          <div className="flex-row align-center justify-center width-100">
            {surrogateMedia.length === 0 && (
              <>
                <br />
                <Alert severity="info">No media found!</Alert>
              </>
            )}
          </div>
          <div className="flex-row surrogate-media-row">
            {surrogateMedia.map((media, index) => {
              if (index === 0 || index === 1) {
                return (
                  <div className="surrogate-media-item">
                    <Card
                      style={{
                        width: "100%",
                      }}
                    >
                      <CardMedia
                        sx={{ height: 140 }}
                        image={Logo}
                        title="Report File"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {media.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <b>Date Created: </b>
                          {getFullDate(media.createdOn)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            const l = document.createElement("a");
                            l.href = media.file;
                            l.target = "_BLANK";
                            l.click();
                          }}
                        >
                          Download
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
          <br />

          {/* <AccountManagement /> */}
        </div>
      </div>
    </div>
  );
}
