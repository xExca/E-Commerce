
import DefaultLayout from "../layouts/DefaultLayout";
import MainDefault from "../components/MainDefault";
import NotFoundPage from "../pages/NotFoundPage";
import TestingForm from "../components/Form/TestingForm";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<DefaultLayout />}>
          <Route path="login" index element={<MainDefault type={"Login"} />} />
          <Route path="signup" element={<MainDefault type={"Register"} />} />
          <Route path="test" element={<TestingForm />} />
        </Route>
        <Route path='/admin/*' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export { AppRoute }