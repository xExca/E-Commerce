import profile from "../assets/image/profile.png"
import { IoIosNotifications } from "react-icons/io";
import { useState } from "react";
import { useStateContext } from "../utils/ContextProvider";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useStateContext();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="py-2 px-8 h-20 bg-white flex justify-end items-center shadow-lg">
      <div className="relative flex flex-row gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row gap-2 items-center" onClick={handleDropdownToggle}>
            <IoIosNotifications size={30} className="cursor-pointer hover:text-gray-800" />
            {showDropdown && (
              <div className="absolute right-[10.5rem] top-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">Notification 1</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Notification 2</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Notification 3</li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <img src={profile} alt="profile" className="w-11 h-11 rounded-full" />
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <span className="font-semibold text-lg">{user?.firstname + " " + user?.lastname}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export const HomeNavbar = () => {
  const { user } = useStateContext();
  return (
    <header className="bg-blue-500 text-white py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold"><Link to={"/home"}>EASYPC</Link></div>
      {user ? (
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row gap-2 items-center">
                <img src={profile} alt="profile" className="w-11 h-11 rounded-full" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <span className="font-semibold text-lg">John Doe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <nav className="flex space-x-4">
          <a href="/home" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Products</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Login</a>
        </nav>
      )}
    </header>
  )
}
