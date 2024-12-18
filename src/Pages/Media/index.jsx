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
  Grid,
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

export default function Media() {
  const ConsumerContext = useContext(DefaultContext);
  const { addToast, removeAllToasts } = useToasts();

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

    setSurrogateReports(
      r.data.status === "success" && r.data.data ? r.data.data : []
    );
    let reports = r.data.data;
    if (reports) {
      reports.map(async (report, index) => {
        const getMedia = await PerformRequest.GetReportFile({
          reportID: report.id,
        });

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
  return (
    <div className="home-page">
      <Typography className="poppins fw-500" variant="h5">
        My Surrogate Media
      </Typography>
      <Grid container spacing={2}>
        {surrogateMedia.map((media, index) => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={index}>
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
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
