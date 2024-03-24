import SearchDialog from "./SearchDialog";

export default function Navbar() {
  return (
    <nav className="box-shadow w-full rounded-md bg-white px-4 py-2">
      <SearchDialog />
    </nav>
  );
}
