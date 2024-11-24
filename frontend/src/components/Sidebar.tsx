import { BiMenuAltRight } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { BsFillMouse3Fill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdPointOfSale } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useStateContext } from "../utils/ContextProvider";
import { useState } from "react";
import axiosAPI from "../utils/axios-api";
const Sidebar = () => {
  const {user,setUser, setToken, checkPermission} = useStateContext();
  const [dropdownOpen,setDropdownOpen] = useState<boolean>(false);

  const onLogout = (e: any) => {
    e.preventDefault();

    axiosAPI.post('/logout')
    .then(()=>{
      setUser(null)
      setToken(null)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <aside className='bg-moss-green-300 flex flex-col justify-between text-black h-auto'>
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
                {checkPermission('manage_features') &&
                  <li>
                    <Link to={'/dashboard'} className='flex items-center gap-2 pl-4 py-2 mx-2 cursor-pointer text-lg hover:bg-emerald-50 hover:text-neutral-800 hover:rounded-md'>
                        <GoHomeFill />
                        <span>Dashboard</span>
                    </Link>
                  </li>
                }
                <li>
                    <Link to={'/users'} className='flex items-center gap-2 pl-4 py-2 mx-2 cursor-pointer text-lg hover:bg-emerald-50 hover:text-neutral-800 hover:rounded-md'>
                        <FaUserFriends />
                        <span>Users</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/orders'} className='flex items-center gap-2 pl-4 py-2 mx-2 cursor-pointer text-lg hover:bg-emerald-50 hover:text-neutral-800 hover:rounded-md'>
                        <IoMdCart />
                        <span>Order</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/sales'} className='flex items-center gap-2 pl-4 py-2 mx-2 cursor-pointer text-lg hover:bg-emerald-50 hover:text-neutral-800 hover:rounded-md'>
                        <MdPointOfSale />
                        <span>Sales</span>
                    </Link>
                </li>
                {checkPermission('view_roles') &&
                  <li>
                    <Link to={'/roles'} className='flex items-center gap-2 pl-4 py-2 mx-2 cursor-pointer text-lg hover:bg-emerald-50 hover:text-neutral-800 hover:rounded-md'>
                        <MdPointOfSale />
                        <span>Roles</span>
                    </Link>
                  </li>
                }
            </ul>
        </div>
        <div>
          {dropdownOpen && 
            <>
              <div id="dropdown" className="absolute left-2 bottom-16 mt-4 w-48 shadow-lg rounded-lg bg-snow-drift-50">
                <p className="px-4 py-2 border-b cursor-pointer hover:bg-emerald-100 hover:rounded-t-lg">Profile</p>
                <p className="px-4 py-2 cursor-pointer hover:bg-emerald-100 hover:rounded-b-lg" onClick={onLogout}>Logout</p>
              </div>
            </>
          }
          <button className='flex items-center gap-2 pl-4 py-3 m-2 cursor-pointer bg-snow-drift-50 text-neutral-800 rounded-md w-48 max-w-[240px]' onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaCircleUser />
              <span className='truncate'> 
                  {`${user?.lastname }, ${user?.firstname} ${user?.middlename}`}
              </span>
          </button>
        </div>
    </aside>
  )
}

export default Sidebar