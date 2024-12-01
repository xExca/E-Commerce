import Card from "../../components/Card"
import { useStateContext } from "../../utils/ContextProvider"
import { IoDocument } from "react-icons/io5"

const Dashboard = () => {
  const {checkPermission} = useStateContext();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {checkPermission('view_user') &&
          <a href={"/admin/users"}>
            <div className="bg-white shadow-md rounded-lg p-6 w-80 sm:w-64 lg:w-80 text-left">
              <div className="flex justify-start items-center mb-4">
                <div className="text-green-700 text-5xl">
                  <IoDocument />
                </div>
              </div>
              <div className="text-green-700 text-4xl font-bold mb-2">{1}</div>
              <div className="text-gray-700 font-medium text-2xl">{"Test"}</div>
            </div>
          </a>
        }
        {checkPermission('view_user') &&
          <a href={"/admin/users"}>
            <div className="bg-white shadow-md rounded-lg p-6 w-80 sm:w-64 lg:w-80 text-left">
              <div className="flex justify-start items-center mb-4">
                <div className="text-green-700 text-5xl">
                  <IoDocument />
                </div>
              </div>
              <div className="text-green-700 text-4xl font-bold mb-2">{1}</div>
              <div className="text-gray-700 font-medium text-2xl">{"Test"}</div>
            </div>
          </a>
        }
        {checkPermission('view_user') &&
          <a href={"/admin/users"}>
            <div className="bg-white shadow-md rounded-lg p-6 w-80 sm:w-64 lg:w-80 text-left">
              <div className="flex justify-start items-center mb-4">
                <div className="text-green-700 text-5xl">
                  <IoDocument />
                </div>
              </div>
              <div className="text-green-700 text-4xl font-bold mb-2">{1}</div>
              <div className="text-gray-700 font-medium text-2xl">{"Test"}</div>
            </div>
          </a>
        }
        {checkPermission('view_user') &&
          <a href={"/admin/users"}>
            <div className="bg-white shadow-md rounded-lg p-6 w-80 sm:w-64 lg:w-80 text-left">
              <div className="flex justify-start items-center mb-4">
                <div className="text-green-700 text-5xl">
                  <IoDocument />
                </div>
              </div>
              <div className="text-green-700 text-4xl font-bold mb-2">{1}</div>
              <div className="text-gray-700 font-medium text-2xl">{"Test"}</div>
            </div>
          </a>
        }
        
      </div>
    </>
  )
}

export default Dashboard

