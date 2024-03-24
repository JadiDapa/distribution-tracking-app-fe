import Actions from "./Actions";
import UserFilter from "./UserFilter";
import UserTable from "./UserTable";

export default function UserData() {
  return (
    <div className="box-shadow w-full rounded-md bg-white">
      <UserFilter />
      <hr />
      <Actions />
      <hr />
      <UserTable />
    </div>
  );
}
