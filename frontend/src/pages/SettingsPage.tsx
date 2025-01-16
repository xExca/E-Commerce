import { useState } from "react"
import CardSelector from "../components/CardSelector"
import CardTitle from "../components/CardTitle"
import PageContent from "../utils/pages/PageContent"

type Props = {}
const SettingsPage = (props: Props) => {
  const [cardSelected, setCardSelected] = useState("profile");
  return (
   <>
    <CardTitle 
      title="Settings"
      filterDate={""}
      setFilterDate={() => {}}
    />
    <PageContent>
      <CardSelector 
        cardTitle="Settings"
        cardSelected={cardSelected}
        setCardSelected={setCardSelected}
        />
      {cardSelected == "profile" && (
        <div className="w-full h-[38rem]">
        {cardSelected === "profile" && (
          <div className="p-0">
            <div className="mx-auto p-6 flex">
              <div className="w-2/3 pr-6">
                <div className="mb-4 flex items-center">
                  <label className="block text-sm font-medium mb-1 w-1/4">Username</label>
                  <input
                    type="text"
                    value="xexca"
                    className="w-3/4 px-4 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label className="block text-sm font-medium mb-1 w-1/4">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label className="block text-sm font-medium mb-1 w-1/4">Email</label>
                  <div className="w-3/4 flex items-center">
                    <input
                      type="email"
                      value="pa********@yahoo.com"
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    />
                    <button className="ml-2 text-sm text-orange-500 hover:underline">Change</button>
                  </div>
                </div>

                <div className="mb-4 flex items-center">
                  <label className="block text-sm font-medium mb-1 w-1/4">Phone Number</label>
                  <div className="w-3/4 flex items-center">
                    <input
                      type="text"
                      value="********00"
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    />
                    <button className="ml-2 text-sm text-orange-500 hover:underline">Change</button>
                  </div>
                </div>

                <div className="mb-4 flex items-center">
                  <label className="block text-sm font-medium mb-1 w-1/4">Gender</label>
                  <div className="w-3/4 flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        defaultChecked
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="gender" value="female" className="mr-2" />
                      Female
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="gender" value="other" className="mr-2" />
                      Other
                    </label>
                  </div>
                </div>

                <div className="mb-4 flex items-center">
                  <label className="block text-sm font-medium mb-1 w-1/4">Date of Birth</label>
                  <div className="w-3/4 flex space-x-2">
                    <select className="w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300">
                      <option>Date</option>
                      {/* Add date options here */}
                    </select>
                    <select className="w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300">
                      <option>Month</option>
                      {/* Add month options here */}
                    </select>
                    <select className="w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300">
                      <option>Year</option>
                      {/* Add year options here */}
                    </select>
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600">
                  Save
                </button>
              </div>

              <div className="w-1/3 flex flex-col items-center">
                <div className="w-32 h-32 mb-4">
                  <img
                    src="https://via.placeholder.com/128"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border"
                  />
                </div>
                <button className="mb-2 px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300">Select Image</button>
                <p className="text-xs text-gray-500 text-center">
                  File size: maximum 1 MB<br />
                  File extension: .JPEG, .PNG
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      )}
      {cardSelected == "address" && (
        <div className="mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">My Addresses</h1>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              + Add New Address
            </button>
          </div>

          <div className="space-y-6">
            {/* Address 1 */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Niño Austral</p>
                  <p className="text-sm text-gray-600">(+63) 997 644 6240</p>
                  <p className="text-sm text-gray-600">25 J.P Rizal St, Nanhaya (Pob.), Victoria, Laguna, South Luzon, 4011</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs text-red-500 border border-red-500 rounded">Default</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-sm text-orange-500 hover:underline">Edit</button>
                  <button className="text-sm text-gray-500 cursor-not-allowed" disabled>Set as default</button>
                </div>
              </div>
            </div>

            {/* Address 2 */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Meg Gonzales</p>
                  <p className="text-sm text-gray-600">(+63) 995 819 7146</p>
                  <p className="text-sm text-gray-600">103 Rizal St. Bulilan Sur, Pila, Laguna, South Luzon, 4010</p>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-1 text-xs text-gray-600 border border-gray-400 rounded">Pickup Address</span>
                    <span className="px-2 py-1 text-xs text-gray-600 border border-gray-400 rounded">Return Address</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-sm text-orange-500 hover:underline">Edit</button>
                  <button className="text-sm text-red-500 hover:underline">Delete</button>
                  <button className="text-sm text-gray-500 hover:underline">Set as default</button>
                </div>
              </div>
            </div>

            {/* Address 3 */}
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Zor Austral</p>
                  <p className="text-sm text-gray-600">(+63) 916 726 5900</p>
                  <p className="text-sm text-gray-600">25 J.P Rizal Street, Brgy Nanhaya, Victoria, Laguna, South Luzon, 4011</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-sm text-orange-500 hover:underline">Edit</button>
                  <button className="text-sm text-red-500 hover:underline">Delete</button>
                  <button className="text-sm text-gray-500 hover:underline">Set as default</button>
                </div>
              </div>
              <div className="mt-4 px-4 py-2 bg-yellow-100 text-yellow-700 text-sm rounded">
                Some information may no longer be up to date, please help us update this address.
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div>
        footer
      </div>
    </PageContent>
    </>
  )
}
export default SettingsPage