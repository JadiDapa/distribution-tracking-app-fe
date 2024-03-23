export default function Jumbotron() {
  return (
    <div className="w-[60%] h-screen hidden md:block relative overflow-hidden">
      <img
        src="/images/login-page.webp"
        className="w-[650px] absolute bottom-20 right-32 z-10"
        alt="Login Page"
      />
      <img
        src="/images/vektor.png"
        className="absolute bottom-0 right-0 h-screen"
        alt="Vector"
      />
    </div>
  );
}
