import { Route } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import UserTable from "../pages/admin/users/UserTable";
import RoleTable from "../pages/admin/roles/RoleTable";
import RoleEdit from "../pages/admin/roles/RoleEdit";


const PrivateRoutes = () => {
  return (
    <>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path="users" element={<UserTable />} />
      <Route path="roles" element={<RoleTable />} />
      <Route path="roles/:id" element={<RoleEdit />} />
    </> 
  );
};

export default PrivateRoutes;