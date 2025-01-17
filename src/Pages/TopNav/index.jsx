import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import ChatIcon from "../../Assets/IMG/ChatIcon.svg";
import BellIcon from "../../Assets/IMG/BellIcon.svg";
import ClaudiaAvatar from "../../Assets/IMG/ClaudiaAvatar.png";
import { DefaultContext } from "../Dashboard";

export default function TopNav() {
  const navigate = useNavigate();
  const ConsumerContext = useContext(DefaultContext);
  const [isTopNavOpen, setTopNavOpen] = useState(true);
  return (
    <>
      {/* <span
        className="toggle-topnav px-35"
        onClick={() => {
          setTopNavOpen(!isTopNavOpen);
        }}
      >
        <i className={`fal fa-angle-${isTopNavOpen ? "up" : "down"}`}></i>
      </span> */}
      <div className="top-nav-container flex-row">
        {/* <span className="top-nav-button flex-row">
          <img
            onClick={() => navigate("/dashboard/messages")}
            src={ChatIcon}
            alt=""
            className="top-nav-icon pointer"
          />
          <span className="top-nav-count flex-row">
            {ConsumerContext.Notifications.unread}
          </span>
        </span> */}
        {/* <span className="top-nav-button flex-row">
          <img src={BellIcon} alt="" className="top-nav-icon" />
          <span className="top-nav-count flex-row">52</span>
        </span> */}
        <motion.div
          initial={false}
          animate={{
            height: isTopNavOpen ? "100px" : "0px",
          }}
          className="top-nav-right flex-row"
        >
          <img
            src={ConsumerContext.Profile.details.primary.image ?? ""}
            alt=""
            className="top-nav-avatar"
          />
          <div className="top-nav-col flex-column">
            <div className="cinzel top-nav-name">
              {ConsumerContext.Profile.firstname}
            </div>
            {/* <div className="cinzel top-nav-name">
              {ConsumerContext.Profile.lastname}
            </div> */}
            <div className="flex-row top-nav-links">
              <span className="top-nav-tag">Parent</span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
