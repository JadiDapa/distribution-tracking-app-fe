import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
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
import Distribution from "./pages/distribution/Distribution";
import AccountRelated from "./pages/account/AccountRelated";
import MaterialInventory from "./pages/material/MaterialInventory";
import ToolInventory from "./pages/tool/ToolInventory";
import VehicleInventory from "./pages/vehicle/VehicleInventory";
import { useEffect } from "react";
import useAuthStore from "./lib/store/AuthStore";
import AccountEdit from "./pages/account/AccountEdit";

export default function App() {
  const [token, saveToken] = useAuthStore((state) => [
    state.token,
    state.saveToken,
  ]);

  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    if (!token) {
      if (checkToken) {
        saveToken(checkToken);
      }
    }
  }, [token, saveToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="distribution" element={<Distribution />} />

          <Route path="/account-related" element={<AccountRelated />} />
          <Route path="/account-list" element={<AccountList />} />
          <Route path="/account-add" element={<AccountAdd />} />
          <Route path="/account-edit/:accountId" element={<AccountEdit />} />

          <Route path="/material-inventory" element={<MaterialInventory />} />
          <Route path="/material-list" element={<MaterialList />} />
          <Route path="/material-add" element={<MaterialAdd />} />

          <Route path="/tool-inventory" element={<ToolInventory />} />
          <Route path="/tool-list" element={<ToolList />} />
          <Route path="/tool-add" element={<ToolAdd />} />

          <Route path="/vehicle-inventory" element={<VehicleInventory />} />
          <Route path="/vehicle-list" element={<VehicleList />} />
          <Route path="/vehicle-add" element={<VehicleAdd />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={"NoPage"} />
      </Routes>
    </BrowserRouter>
  );
}
