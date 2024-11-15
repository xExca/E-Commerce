
import DefaultLayout from "../layouts/DefaultLayout";
import MainDefault from "../components/MainDefault";
import NotFoundPage from "../pages/NotFoundPage";
import UserLayout from "../layouts/UserLayout";
import AdminDashboard from "../components/Admin/AdminDashboard";
import TestingForm from "../components/Form/TestingForm";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Users from "../pages/admin/Users";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<DefaultLayout />}>
          <Route path="login" element={<MainDefault type={"Login"} />} />
          <Route index element={<MainDefault type={"Login"} />} />
          <Route path="signup" element={<MainDefault type={"Register"} />} />
          <Route path="test" element={<TestingForm />} />
        </Route>
        <Route path='/admin/*' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path='/user' element={<UserLayout/>}>
        <Route path="/user/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export { AppRoute }