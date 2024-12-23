import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
type Props = {
  nextPage: () => void,
  previousPage: () => void,
  setPerPage: (page: number) => void,
  currentPage: number,
  perPage: number
  lastPage: number
}
const TablePagination = ({nextPage, previousPage,setPerPage, currentPage, perPage, lastPage}:Props) => {
  const handleChangePerPage = (e:any) =>{
    setPerPage(e.target.value)
  }
  return (
    <div className="flex flex-row justify-between">
      <div>
        <select className="px-2 py-1 rounded-md border border-gray-400 focus:border-blue-500" onChange={(e) => handleChangePerPage(e)}>
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
      <div>
        <button className={`inline-flex items-center px-2 py-1 border border-gray-400 rounded-md shadow-sm text-sm font-medium ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200'}`}
        onClick={() => nextPage()}>
          <MdNavigateBefore size={24} className="mr-1" />
        </button>
        <button className={`inline-flex items-center px-2 py-1 border border-gray-400 rounded-md shadow-sm text-sm font-medium ${currentPage === lastPage ? 'opacity-50 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200'}`}
        disabled={currentPage === lastPage}
        onClick={() => previousPage()}>
          <MdNavigateNext size={24} className="ml-1" />
        </button>
      </div>

    </div>
  )
}
export default TablePagination