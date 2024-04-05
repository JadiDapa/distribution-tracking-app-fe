import Decorations from "@/components/Login/Decorations";
import Header from "@/components/Login/Header";
import Jumbotron from "@/components/Login/Jumbotron";
import LoginForm from "@/components/Login/LoginForm";
import useAuthStore from "@/lib/store/AuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      return navigate("/");
    }
  }, [navigate, token]);

  return (
    <div className="overflow-hidden lg:flex">
      <main className="flex h-screen flex-col justify-center gap-8 overflow-hidden px-10 py-6 lg:w-[40%] lg:pl-32">
        <Header />
        <LoginForm />
        <Decorations />
      </main>
      <Jumbotron />
    </div>
  );
}

export default Login;
