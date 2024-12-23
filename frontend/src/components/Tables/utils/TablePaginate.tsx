import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

type Props = {
  canNextPage:boolean
  canPreviousPage:boolean
  nextPage:()=>void
  previousPage:()=>void
  setPageIndex:(page: number) => void
  pageIndex:number
  pageSize:number
  setPageSize: (size: number) => void
  totalEntries:number
}

const TablePaginate = ({canNextPage, canPreviousPage, nextPage, previousPage, setPageIndex, pageIndex, pageSize, setPageSize, totalEntries}:Props) => {
  
  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalEntries);
  
  return (
    <div className="h-[3rem] border-t border-b border-gray-200 flex justify-between items-center px-4 w-full">
    <div className="flex items-baseline gap-2">
      <select
        className="border border-gray-300 rounded px-2 py-1"
        onChange={(e) => setPageSize && setPageSize(Number(e.target.value))}
        value={pageSize}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <div className="text-gray-600">Showing {from} to {to} of {totalEntries} entries</div>
    </div>
    <div className="flex items-center space-x-2">
      <button
        className="p-2 disabled:text-gray-400"
        disabled={!canPreviousPage}
        onClick={() => setPageIndex(0)}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>
      <button
        className="p-2 disabled:text-gray-400"
        disabled={!canPreviousPage}
        onClick={previousPage}
      >
        <MdOutlineKeyboardArrowLeft />
      </button>
      <span className="px-3 py-1 border border-gray-300 rounded bg-gray-100">{pageIndex+1}</span>
      <button 
        className="p-2 disabled:text-gray-400"
        disabled={!canNextPage}
        onClick={nextPage}>
        <MdOutlineKeyboardArrowRight />
      </button>
      <button 
        className="p-2 disabled:text-gray-400" 
        disabled={!canNextPage}
        onClick={() => {setPageIndex(Math.ceil(totalEntries / pageSize) - 1)}}>
        <MdOutlineKeyboardDoubleArrowRight/>
      </button>
    </div>
  </div>
  )
}
export default TablePaginate