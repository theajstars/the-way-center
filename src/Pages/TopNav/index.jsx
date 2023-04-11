import ChatIcon from "../../Assets/IMG/ChatIcon.svg";
import BellIcon from "../../Assets/IMG/BellIcon.svg";
import ClaudiaAvatar from "../../Assets/IMG/ClaudiaAvatar.png";
export default function TopNav() {
  return (
    <div className="top-nav-container flex-row">
      <span className="top-nav-button flex-row">
        <img src={ChatIcon} alt="" className="top-nav-icon" />
        <span className="top-nav-count flex-row">18</span>
      </span>
      <span className="top-nav-button flex-row">
        <img src={BellIcon} alt="" className="top-nav-icon" />
        <span className="top-nav-count flex-row">52</span>
      </span>
      <div className="top-nav-right flex-row">
        <img src={ClaudiaAvatar} alt="" className="top-nav-avatar" />
        <div className="top-nav-col flex-column">
          <span className="cinzel top-nav-name">claudia akinsanjo thomas</span>
          <div className="flex-row top-nav-links">
            <span className="top-nav-link">Edit Profile</span>
            <span className="top-nav-tag">Parent Account</span>
          </div>
        </div>
      </div>
    </div>
  );
}
