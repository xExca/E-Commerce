
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { HomeNavbar } from '../components/Navbar';
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { Card, Typography } from '@mui/material';
import { useStateContext } from '../utils/ContextProvider';

const UserLayout = () => {
  const {token} = useStateContext();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <HomeNavbar />
      {!token ? (
        <main className="flex-1 overflow-y-auto grid grid-cols-2 grid-rows-1 gap-0">
        <div className="row-span-2 items-center justify-center flex">
          <HiOutlineComputerDesktop className="text-white text-9xl" />
        </div>
        <div className="row-span-2 items-center justify-center flex">
          <Card className="p-6 flex flex-col gap-6 shadow-lg rounded-md bg-white">
            <Typography variant="h4" className="mb-6 text-left font-semibold">Login</Typography>
            <Outlet />
            <Typography align="center" className="mt-4">
              <NavLink to="/register" className="text-blue-500 hover:underline">Don't have an account? Register here</NavLink>
            </Typography>
          </Card>
        </div>
      </main>
      ) : (
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      )}
      <Footer />
    </div>
  )
}

export default UserLayout