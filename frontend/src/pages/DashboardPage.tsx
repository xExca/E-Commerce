import { Navigate } from "react-router-dom";
import { useStateContext } from "../utils/ContextProvider";

const DashboardPage = () => {
  const {checkPermission} = useStateContext();

  if(checkPermission('view_dashboard') === false) return <Navigate to="/not-found" />
  
  return (
    <div>DashboardPage</div>
  )
}
export default DashboardPage