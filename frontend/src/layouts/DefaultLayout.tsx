import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"


const DefaultLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-sky-500 to-indigo-500">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
export default DefaultLayout