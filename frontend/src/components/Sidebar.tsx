import { NavLink, useNavigate } from 'react-router-dom';
import { useStateContext } from "../utils/ContextProvider";
import { useState } from "react";
import axiosAPI from "../utils/axios-api";
import Background from '../assets/image/image_2024-12-12_140928163-removebg-preview.png';
import { MdEmail, MdHome, MdPerson, MdSettings } from 'react-icons/md';
import { IoCartSharp, IoGrid } from 'react-icons/io5';
import { FaBox } from 'react-icons/fa';
import { FaArrowRightFromBracket, FaUserGroup } from 'react-icons/fa6';

const Sidebar = () => {
  const {user,setUser, setToken, checkPermission} = useStateContext();
  const navigate = useNavigate();
  const onLogout = (e: any) => {
    e.preventDefault();

    axiosAPI.post('/logout', {},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      }
    })
      .then(()=>{
        setUser(null)
        setToken(null)
        navigate('/')
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  return (
    <div className="bg-white min-w-64 h-screen flex flex-col justify-between shadow-lg">
      <div className='flex flex-col'>
        <div className='w-full'>
          <img src={Background} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col gap-2 text-lg font-semibold m-4'>
         {checkPermission('view_dashboard') && (
            <NavLink
            to='/dashboard'
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-500' : 'hover:bg-blue-50 hover:text-blue-500 text-gray-500'}`
            }
          >
            <IoGrid size={30} />
            <span>Dashboard</span>
          </NavLink>
         )}
         {checkPermission('view_orders') && (
            <NavLink
              to='/orders'
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-500' : 'hover:bg-blue-50 hover:text-blue-500 text-gray-500'}`
              }
            >
              <IoCartSharp size={30} />
              <span>Orders</span>
            </NavLink>
         )}
         {checkPermission('view_products') && (
            <NavLink
              to='/products'
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-500' : 'hover:bg-blue-50 hover:text-blue-500 text-gray-500'}`
              }
            >
              <FaBox size={30} />
              <span>Products</span>
            </NavLink>
         )}
          {checkPermission('view_customers') && (
            <NavLink
              to='/customer'
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-500' : 'hover:bg-blue-50 hover:text-blue-500 text-gray-500'}`
              }
              >
              <FaUserGroup size={30} />
              <span>Customer</span>
            </NavLink>
          )}
          {checkPermission('view_message') && (
            <NavLink
              to='/message'
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-500' : 'hover:bg-blue-50 hover:text-blue-500 text-gray-500'}`
              }
            >
              <MdEmail size={30} />
              <span>Message</span>
            </NavLink>
          )}
          {checkPermission('view_settings') && (
            <NavLink
              to='/settings'
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-500' : 'hover:bg-blue-50 hover:text-blue-500 text-gray-500'}`
              }
            >
              <MdSettings size={30} />
              <span>Settings</span>
            </NavLink>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-2 text-lg font-semibold m-4'>
        <button onClick={onLogout} className='flex items-center gap-2 p-2 hover:bg-blue-50 hover:text-blue-500 text-gray-500 rounded-md'>
          <FaArrowRightFromBracket size={24} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar