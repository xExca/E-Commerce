
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { HomeNavbar } from '../components/Navbar';

const UserLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <HomeNavbar />
      <Outlet/>
      <Footer />
    </div>
  )
}

export default UserLayout