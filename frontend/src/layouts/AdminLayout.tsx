import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../utils/ContextProvider"
type Props = {}
const AdminLayout = (props: Props) => {
  const {token, user} = useAuth();
  if(!token){
    return <Navigate to="/login"/>
  }
  return (
    <>
    <div>AdminLayout</div>
    <Outlet/>
    </>
  )
}
export default AdminLayout