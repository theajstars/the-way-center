import { useState, useRef } from "react";

import { Typography } from "@mui/material";
import { motion } from "framer-motion";

import { SurrogateRecords, SurrogateReports } from "../../Assets/Data";

import AishaAvatar from "../../Assets/IMG/AishaAvatar.svg";
import PurpleFlower from "../../Assets/IMG/PurpleFlower.svg";
export default function Home() {
  const ModifySurrogatesRef = useRef();
  const [SurrogateRecordsToDisplay, setSurrogateRecordsToDisplay] = useState(
    SurrogateRecords.slice(0, 4)
  );
  const ModifySurrogateRecordsToDisplay = () => {
    if (SurrogateRecordsToDisplay.length === SurrogateRecords.length) {
      setSurrogateRecordsToDisplay(SurrogateRecords.slice(0, 4));
    } else {
      setSurrogateRecordsToDisplay(SurrogateRecords);
      setTimeout(() => {
        ModifySurrogatesRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <Typography className="poppins fw-500" variant="h5">
        PARENT DASHBOARD
      </Typography>
      <br />
      <div className="home-container flex-row">
        <div className="home-container-left flex-column">
          <img src={AishaAvatar} alt="" className="home-avatar" />
          <span className="home-username fw-500 cinzel px-23">
            Aisha Immanuel
          </span>
          <span className="home-usertag poppins px-16 fw-500">
            My Surrogate
          </span>
          <hr className="home-divider" />
          <motion.div
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
          </motion.div>
          <span
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
          </span>
        </div>

        <div className="home-container-right flex-column">
          <div className="flex-row space-between">
            <span className="poppins fw-500 px-18">
              Your Surrogate Reports from TWC
            </span>
            <span className="poppins fw-500 px-16 purple-default-text view-more-reports">
              View More
            </span>
          </div>
          <div className="surrogate-reports flex-row space-between">
            {SurrogateReports.slice(0, 3).map((report, index) => {
              return (
                <div className="surrogate-report flex-column" key={index}>
                  <div className="flex-row surrogate-report-top space-between">
                    <div className="flex-column">
                      <span className="cinzel px-14 gray-secondary-text surrogate-report-type">
                        {report.type}
                      </span>
                      <span className="cinzel px-16 surrogate-report-title">
                        {report.title}
                      </span>
                    </div>
                    <img
                      src={AishaAvatar}
                      alt=""
                      className="surrogate-report-avatar"
                    />
                  </div>
                  <span className="surrogate-report-body poppins px-15 fw-300">
                    {report.body.length > 200
                      ? `${report.body.substring(0, 120)}...`
                      : report.body}
                  </span>
                  <div className="flex-row space-between">
                    <span className="flex-column align-center">
                      <span
                        className={`surrogate-report-verdict flex-row poppins fw-500 px-14 surrogate-report-${report.verdict.toLowerCase()}`}
                      >
                        {report.verdict}
                      </span>
                      <small className="px-10 fw-500 poppins">
                        Doctor’s Overall Remark
                      </small>
                    </span>

                    <span className="px-14 poppins fw-500 pointer">
                      <u>View Full Report</u>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
