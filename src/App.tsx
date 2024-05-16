import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import Login from "./pages/auth/Login";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import ToolList from "./pages/tool/ToolList";
import VehicleList from "./pages/vehicle/VehicleList";
import AccountList from "./pages/account/AccountList";
import AccountAdd from "./pages/account/AccountAdd";
import ToolAdd from "./pages/tool/ToolAdd";
import VehicleAdd from "./pages/vehicle/VehicleAdd";
import AccountRelated from "./pages/account/AccountRelated";
import ToolInventory from "./pages/tool/ToolInventory";
import VehicleInventory from "./pages/vehicle/VehicleInventory";
import useAuthStore from "./lib/store/AuthStore";
import AccountEdit from "./pages/account/AccountEdit";
import RequestList from "./pages/request/RequestList";
import RequestInbox from "./pages/request/RequestInbox";
import HandleRequest from "./pages/request/HandleRequest";
import AccountDetail from "./pages/account/AccountDetail";
import MaterialInventory from "./pages/material/MaterialInventory";
import MaterialInventoryUpdate from "./pages/material/MaterialInventoryUpdate";
import MaterialList from "./pages/material/MaterialList";
import MaterialAdd from "./pages/material/MaterialAdd";
import MaterialEdit from "./pages/material/MaterialEdit";
import RequestTool from "./pages/request/RequestTool";
import RequestMaterial from "./pages/request/RequestMaterial";
import RequestDetail from "./pages/request/RequestDetail";
import ToolEdit from "./pages/tool/ToolEdit";
import VehicleEdit from "./pages/vehicle/VehicleEdit";
import ToolInventoryUpdate from "./pages/tool/ToolInventoryUpdate";
import MaterialUpdates from "./pages/material/MaterialUpdates";
import MaterialUpdateDetail from "./pages/material/MaterialUpdateDetail";
import ToolUpdates from "./pages/tool/ToolUpdates";
import ToolUpdateDetail from "./pages/tool/ToolUpdateDetail";

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
          <Route
            path="/request-detail/:requestId"
            element={<RequestDetail />}
          />
          <Route path="/request-inbox/:requestId" element={<HandleRequest />} />
          <Route path="/request-item/material" element={<RequestMaterial />} />
          <Route path="/request-item/tool" element={<RequestTool />} />
          <Route path="/account-related" element={<AccountRelated />} />
          <Route path="/account-list" element={<AccountList />} />
          <Route path="/account-add" element={<AccountAdd />} />
          <Route path="/account-related" element={<AccountRelated />} />
          <Route
            path="/account-detail/:accountId"
            element={<AccountDetail />}
          />
          <Route path="/account-edit/:accountId" element={<AccountEdit />} />
          <Route path="/material-inventory" element={<MaterialInventory />} />
          <Route
            path="/material-quantity"
            element={<MaterialInventoryUpdate />}
          />
          <Route path="/material-updates" element={<MaterialUpdates />} />
          <Route
            path="/material-update/:updateId"
            element={<MaterialUpdateDetail />}
          />
          <Route path="/material-list" element={<MaterialList />} />
          <Route path="/material-add" element={<MaterialAdd />} />
          <Route path="/material-edit/:materialId" element={<MaterialEdit />} />
          <Route path="/tool-inventory" element={<ToolInventory />} />
          <Route path="/tool-quantity" element={<ToolInventoryUpdate />} />
          <Route path="/tool-updates" element={<ToolUpdates />} />
          <Route path="/tool-update/:updateId" element={<ToolUpdateDetail />} />
          <Route path="/tool-list" element={<ToolList />} />
          <Route path="/tool-add" element={<ToolAdd />} />\
          <Route path="/tool-edit/:toolId" element={<ToolEdit />} />
          <Route path="/vehicle-inventory" element={<VehicleInventory />} />
          <Route path="/vehicle-list" element={<VehicleList />} />
          <Route path="/vehicle-add" element={<VehicleAdd />} />
          <Route path="/vehicle-edit/:vehicleId" element={<VehicleEdit />} />
        </Route>
        <Route path="*" element={"NoPage"} />
      </Routes>
    </BrowserRouter>
  );
}
