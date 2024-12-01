import { Outlet, Navigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import { useStateContext } from "../utils/ContextProvider";
import Sidebar from "../components/Sidebar";
type Props = {}
const AdminLayout = (props: Props) => {
  const {token, user} = useStateContext();
  
  if (!token || !user) {
    return <Navigate to="/login"/>
  }
  return (
    <>
    <div className="flex flex-col h-screen">
      {/* <div className="w-full">
        <Navbar />
      </div> */}
      <div className="flex flex-row h-full w-full bg-snow-drift-50">
        <Sidebar />
        <div className="flex items-center justify-center flex-1 p-10">
          <div className="bg-slate-100 w-full h-full rounded-lg shadow-2xl p-4 border-solid border-2 border-snow-drift-100 overflow-auto">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default AdminLayout