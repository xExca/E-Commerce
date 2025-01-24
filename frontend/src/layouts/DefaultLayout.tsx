import { Outlet, Navigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useStateContext } from "../utils/ContextProvider"



const DefaultLayout = () => {
  const {user,token} = useStateContext();
  if(token){
    return <Navigate to="/home"/>
  }
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-sky-500 to-indigo-500">  
      <Outlet />
      <Footer />
    </div>
  )
}
export default DefaultLayout