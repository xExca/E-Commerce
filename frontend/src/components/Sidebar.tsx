import React from 'react'
import { BiMenuAltRight } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { BsFillMouse3Fill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdPointOfSale } from "react-icons/md";
const Sidebar = () => {
  return (
    <aside className='bg-emerald-500 h-screen sm:min-w-64 flex flex-col justify-between text-slate-50'>
        <div>
            <div className='flex items-center gap-2 text-xl font-bold p-3'>
                <BsFillMouse3Fill/>
                <span> Build-A-PC</span>
                <button 
                    onClick = {() => {}}
                    className='ml-auto cursor-pointer hover:bg-emerald-50 hover:text-neutral-800 hover:rounded-md p-3'>
                    <BiMenuAltRight />
                </button>
                
            </div>
            
            <ul>
                <li>
                    <a className='flex items-center gap-2 pl-4 py-2 mx-2 cursor-pointer text-lg hover:bg-emerald-50 hover:text-neutral-800 hover:rounded-md'>
                        <GoHomeFill />
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a className='flex items-center gap-2 pl-4 py-2 mx-2 cursor-pointer text-lg hover:bg-emerald-50 hover:text-neutral-800 hover:rounded-md'>
                        <FaUserFriends />
                        <span>Users</span>
                    </a>
                </li>
                <li>
                    <a className='flex items-center gap-2 pl-4 py-2 mx-2 cursor-pointer text-lg hover:bg-emerald-50 hover:text-neutral-800 hover:rounded-md'>
                        <IoMdCart />
                        <span>Order</span>
                    </a>
                </li>
                <li>
                    <a className='flex items-center gap-2 pl-4 py-2 mx-2 cursor-pointer text-lg hover:bg-emerald-50 hover:text-neutral-800 hover:rounded-md'>
                        <MdPointOfSale />
                        <span>Sales</span>
                    </a>
                </li>
            </ul>
        </div>
        <div>
            <a className='flex items-center gap-2 pl-4 py-3 m-2 cursor-pointer bg-emerald-100 text-neutral-800 rounded-md'>
                <FaCircleUser />
                <span>Juan Dela Cruz</span>
            </a>
        </div>
    </aside>
  )
}

export default Sidebar