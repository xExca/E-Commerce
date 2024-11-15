import { Outlet, Navigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import { useStateContext } from "../utils/ContextProvider";
import Sidebar from "../components/Sidebar";
type Props = {}
const AdminLayout = (props: Props) => {
  const {user, token, setUser, setToken} = useStateContext();
  
  if (!token) {
    return <Navigate to="/login"/>
  }
  return (
    <>
    <div className="flex flex-col h-screen">
      {/* <div className="w-full">
        <Navbar />
      </div> */}
      <div className="flex flex-row h-full bg-snow-drift-50">
        <Sidebar />
        <Outlet/>
      </div>
    </div>
    </>
  )
}
export default AdminLayout