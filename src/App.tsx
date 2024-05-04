import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import Login from "./pages/auth/Login";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import MaterialList from "./pages/material/MaterialList";
import ToolList from "./pages/tool/ToolList";
import VehicleList from "./pages/vehicle/VehicleList";
import AccountList from "./pages/account/AccountList";
import AccountAdd from "./pages/account/AccountAdd";
import MaterialAdd from "./pages/material/MaterialAdd";
import ToolAdd from "./pages/tool/ToolAdd";
import VehicleAdd from "./pages/vehicle/VehicleAdd";
import AccountRelated from "./pages/account/AccountRelated";
import MaterialInventory from "./pages/material/MaterialInventory";
import ToolInventory from "./pages/tool/ToolInventory";
import VehicleInventory from "./pages/vehicle/VehicleInventory";
import useAuthStore from "./lib/store/AuthStore";
import AccountEdit from "./pages/account/AccountEdit";
import RequestList from "./pages/request/RequestList";
import RequestItem from "./pages/request/RequestItem";
import RequestInbox from "./pages/request/RequestInbox";
import HandleRequest from "./pages/request/HandleRequest";
import MaterialInventoryUpdate from "./pages/material/MaterialInventoryUpdate";

export default function App() {
  const { userData, saveUser } = useAuthStore();

  useEffect(() => {
    const getUserData = localStorage.getItem("userData");
    if (!userData && getUserData) {
      const getToken = JSON.parse(getUserData);
      saveUser(getToken);
    }
  }, [userData, saveUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/request-list" element={<RequestList />} />
          <Route path="/request-inbox" element={<RequestInbox />} />
          <Route path="/request-inbox/:requestId" element={<HandleRequest />} />
          <Route path="/request-item/:itemType" element={<RequestItem />} />

          <Route path="/account-related" element={<AccountRelated />} />
          <Route path="/account-list" element={<AccountList />} />
          <Route path="/account-add" element={<AccountAdd />} />
          <Route path="/account-edit/:accountId" element={<AccountEdit />} />

          <Route path="/material-inventory" element={<MaterialInventory />} />
          <Route
            path="/material-quantity"
            element={<MaterialInventoryUpdate />}
          />
          <Route path="/material-list" element={<MaterialList />} />
          <Route path="/material-add" element={<MaterialAdd />} />

          <Route path="/tool-inventory" element={<ToolInventory />} />
          <Route path="/tool-list" element={<ToolList />} />
          <Route path="/tool-add" element={<ToolAdd />} />

          <Route path="/vehicle-inventory" element={<VehicleInventory />} />
          <Route path="/vehicle-list" element={<VehicleList />} />
          <Route path="/vehicle-add" element={<VehicleAdd />} />
        </Route>
        <Route path="*" element={"NoPage"} />
      </Routes>
    </BrowserRouter>
  );
}
