import TablePaginate from "../../utils/tables/TablePaginate";
import {FaArrowUp, FaArrowDown, FaUpDown} from "react-icons/fa6";
import { PropagateLoader } from "react-spinners";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { FaMehRollingEyes } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


type Props = {
  data: any
  isLoading: boolean
}
const ProductsTable = ({data, isLoading}: Props) => {
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      enableSorting: true,
    },
    {
      header: 'Name',
      accessorKey: 'name',
      enableSorting: true,
    },
    {
      header: 'Discount',
      accessorKey: 'discount',
      enableSorting: true,
    },
    {
      header: 'Price',
      accessorKey: 'price',
      enableSorting: true,
    },
    {
      header: 'Action',
      cell:({ row }: any) => (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => console.log(row.original)} className="text-blue-500 hover:text-blue-700 transition duration-200 border border-blue-500 rounded-md p-1 text-2xl"><FaMehRollingEyes /></button>
          <button onClick={() => console.log(row.original)} className="text-red-500 hover:text-red-700 transition duration-200 border border-red-500 rounded-md p-1 text-2xl"><MdDeleteForever /></button>
        </div>
      )
      
    }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="h-[38rem] w-full">
        <table className="min-w-full table-fixed h-full w-full">
          <thead className="w-full">
            <tr className="w-full flex justify-center">
              {table.getHeaderGroups().map((headerGroup) => (
                headerGroup.headers.map((header) => (
                  <th key={header.id} className={`w-full text-center cursor-pointer flex items-center justify-center gap-1`}
                  onClick={header.column.getToggleSortingHandler()}>
                    {header.isPlaceholder ? null : (
                      <>
                        <span className="flex items-center gap-1">
                          <span className="w-full">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                          {header.column.getIsSorted() === 'asc' ? (
                            <FaArrowUp className="text-sm" />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <FaArrowDown className="text-sm" />
                          ) : (
                            <FaUpDown className="text-sm" />
                          )}
                        </span>
                      </>
                    )}
                  </th>
                ))
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {isLoading ? (
              <tr className="w-full flex justify-center items-center h-full">
                <td colSpan={6} className="w-full flex justify-center items-center py-4">
                  <PropagateLoader color="#0ea5e9" size={30} />
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="w-full flex justify-center">
                  {row.getVisibleCells().map((cell) => {
                    const isStatusColumn = cell.column.id === 'status';
                    return (
                      <td
                        key={cell.id}
                        className={`w-full text-center py-3 ${
                          isStatusColumn ? 'font-semibold' : ''
                        }`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <TablePaginate
          canNextPage={table.getCanNextPage()}
          canPreviousPage={table.getCanPreviousPage()}
          nextPage={table.nextPage}
          previousPage={table.previousPage}
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          setPageSize={table.setPageSize}
          totalEntries={table.options.data.length}
          setPageIndex={(pageIndex: number) => table.setPageIndex(pageIndex)}
        />
    </div>
  )
}
export default ProductsTable