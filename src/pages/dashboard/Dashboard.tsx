import useAuthStore from "@/lib/store/AuthStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(false);
  const { removeToken } = useAuthStore();

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    removeToken();
    navigate("/login");
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("firstLog");
    if (isLoggedIn) {
      setShowWelcome(true);
      const deleteFirstLog = () => {
        localStorage.removeItem("firstLog");
        setShowWelcome(false);
      };
      setTimeout(deleteFirstLog, 5000);
    }
  }, []);

  return (
    <>
      <button onClick={logout}>Logout</button>
      {showWelcome && <h1>Welkam</h1>}
    </>
  );
}
