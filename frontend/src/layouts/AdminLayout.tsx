import { Outlet, Navigate } from "react-router-dom"
import {Navbar} from "../components/Navbar";
import { useStateContext } from "../utils/ContextProvider";
import Sidebar from "../components/Sidebar";
type Props = {}
const AdminLayout = (props: Props) => {
  const {token, user} = useStateContext();
  
  if (!token || !user) {
    return <Navigate to="/"/>
  }
  return (
    <>
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="w-full h-full">
          <div className="p-12 pt-14 w-full h-screen grid grid-cols-1 gap-4 overflow-y-hidden">
            <div className="h-[48rem] flex flex-col">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default AdminLayout