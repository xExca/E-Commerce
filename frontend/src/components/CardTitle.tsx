import Flatpickr from "react-flatpickr";
import { ImCross } from "react-icons/im";

type Props = {
  filterDate?: string,
  setFilterDate: (date:string) => void,
  title:string
  search:string
  setSearch: (search:string) => void
  isSearchEnable: boolean
}

const CardTitle = ({title,search,setSearch,isSearchEnable}: Props) => {
  return (
    <div className="h-[3.5rem] flex flex-row justify-between px-4">
      <div className="flex flex-row items-baseline gap-1">
        <span className="text-3xl font-bold">{title}</span>
      </div>
      <div className="flex items-center">
        <div className="relative">     
        {/* {filterDate && (
          <>
          <Flatpickr
            value={filterDate}
            onChange={(date) => {
              const selectedDate = new Date(date[0]);
              selectedDate.setDate(selectedDate.getDate()+1);
              setFilterDate(selectedDate.toISOString().split('T')[0]);
            }}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 pr-8"
            placeholder="Select Date"
          />
            <button
              onClick={() => setFilterDate("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 text-lg"
            >
              <ImCross size={15}/>
            </button>
            </>
          )} */}
          {isSearchEnable && (
             <input
             type="text"
             placeholder="Search by name"
            className="border px-4 py-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}     
           />
          )}        
        </div>
      </div>
    </div>
  )
}
export default CardTitle