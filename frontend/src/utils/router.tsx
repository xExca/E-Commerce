import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import MainDefault from "../components/MainDefault";
import NotFoundPage from "../pages/NotFoundPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path="/login" element={<MainDefault type={"Login"} />} />
        <Route path="/signup" element={<MainDefault type={"Register"}/>} />
      </Route>
      <Route path="*" element={<NotFoundPage/>}></Route>
    </Route>
  )
);
export default router