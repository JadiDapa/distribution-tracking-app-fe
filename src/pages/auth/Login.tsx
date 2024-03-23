import Decorations from "@/components/Login/Decorations";
import Header from "@/components/Login/Header";
import Jumbotron from "@/components/Login/Jumbotron";
import LoginForm from "@/components/Login/LoginForm";

function Login() {
  return (
    <div className="lg:flex overflow-hidden">
      <main className="px-10 py-6 flex flex-col gap-8 justify-center h-screen lg:w-[40%] lg:pl-32 overflow-hidden">
        <Header />
        <LoginForm />
        <Decorations />
      </main>
      <Jumbotron />
    </div>
  );
}

export default Login;
