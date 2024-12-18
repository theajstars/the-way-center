import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const token = localStorage.getItem("token");

export default function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}
