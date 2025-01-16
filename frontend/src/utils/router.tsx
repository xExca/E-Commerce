import MainDefault from "../components/MainDefault";
import NotFoundPage from "../pages/NotFoundPage";
import AdminLayout from "../layouts/AdminLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import RoleEdit from "../pages/admin/roles/RoleEdit";
import Home from "../pages/Home";
import { useStateContext } from "./ContextProvider";
import DefaultLayout from "../layouts/DefaultLayout";
import OrdersPage from "../pages/OrdersPage";
import DashboardPage from "../pages/DashboardPage";
import ProductsPage from "../pages/ProductsPage";
import CustomerPage from "../pages/CustomerPage";
import SettingsPage from "../pages/SettingsPage";
import RoleTable from "../components/Tables/RoleTable";
import UserTable from "../components/Tables/UserTable";
import ReactQueryPractice from "../components/TestComponents/ReactQueryPractice";
import TestPage from "../pages/Test/TestPage";
import ShoppingCart from "../components/ShoppingCart";
import UserLayout from "../layouts/UserLayout";

const AppRoute: React.FC = () => {
  const {token} = useStateContext();
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<UserLayout/>}>
            <Route path="/home" element={<Home />}/>
            <Route path="/test" element={<TestPage />}/>
            <Route path='/cart' element={<ShoppingCart />} />
          </Route>
          <Route element={<DefaultLayout/>}>
            <Route path="/" element={<MainDefault />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path='/test'element={<ReactQueryPractice/>} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/customer' element={<CustomerPage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/roles" element={<RoleTable />} />
            <Route path="/roles/:id" element={<RoleEdit />} />
          </Route>
        
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export { AppRoute }