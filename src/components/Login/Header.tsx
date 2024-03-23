export default function Header() {
  return (
    <header className="flex flex-col items-center gap-1">
      <img src="/images/logo-pln.png" width={80} className="" alt="Logo" />
      <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
      <p className="text-sm text-slate-500">Sign in to continue</p>
    </header>
  );
}
