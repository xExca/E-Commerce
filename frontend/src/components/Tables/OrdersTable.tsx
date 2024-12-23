// import { Modal } from "@mui/material";
// import { useState } from "react";
// import { IoMdClose } from "react-icons/io";
import axiosAPI from "../../utils/axios-api";
import Swal from "sweetalert2";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { PropagateLoader } from "react-spinners";
import { MdDeleteForever } from "react-icons/md";
import { FaArrowDown, FaArrowUp, FaMehRollingEyes, FaSort } from "react-icons/fa";
import TablePaginate from "./utils/TablePaginate";
import { FaUpDown } from "react-icons/fa6";
type Props = {
  orders?: Order[],
  isLoading: boolean
  refetch: () => void
};

type Order = {
  id: number,
  user: string,
  product_name:string,
  total_price: number,
  status: string,
  date_ordered: string,
}
const OrdersTable = ({orders, isLoading,refetch}: Props) => {

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteOrder = async (id: number) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosAPI.delete(`/admin/orders/${id}`)
        .then((response)=>{
          console.log(response.data);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }).catch((error)=>{
          console.log(error);
        }).finally(()=>{
          refetch();
        });
      }
    })
  }
  
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      enableSorting: true,
    },
    {
      header: 'Customer',
      accessorKey: 'user',
      enableSorting: true,
    },
    {
      header: 'Date Ordered',
      accessorKey: 'date_ordered',
      enableSorting: true,
    },
    {
      header: 'Total',
      accessorKey: 'total_price',
      enableSorting: true,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }: any) => {
        const status = row.original.status;
        let bgColor = '';

        switch (status) {
          case 'pending':
            bgColor = 'bg-yellow-200';
            break;
          case 'delivered':
            bgColor = 'bg-green-200';
            break;
          case 'shipped':
            bgColor = 'bg-green-200';
            break;
          case 'cancelled':
            bgColor = 'bg-red-200';
            break;
          default:
            bgColor = 'bg-gray-200';
        }

        return (
          <span className={`mx-10 py-1 text-center rounded-3xl font-semibold flex items-center justify-center ${bgColor}`}>
            {status == 'shipped' ? 'Delivered' : status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      }

    },
    {
      header: 'Actions',
      cell: ({ row }: any) => (
        <div className="flex items-center justify-center gap-2">
         <button onClick={() => getOrder(row.original.id)} className="text-blue-500 hover:text-blue-700 transition duration-200 border border-blue-500 rounded-md p-1 text-2xl"><FaMehRollingEyes /></button>
         <button onClick={() => deleteOrder(row.original.id)} className="text-red-500 hover:text-red-700 transition duration-200 border border-red-500 rounded-md p-1 text-2xl"><MdDeleteForever /></button>
        </div>
      ),
    },
  ]
  const table = useReactTable({
    data: orders ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  
  return (
    <>
      <div className="h-[38rem] w-full">
        <table className="min-w-full table-fixed h-full w-full">
          <thead>
            <tr className="flex">
              {table.getHeaderGroups().map((headerGroup) => (
                headerGroup.headers.map((header) => (
                  <th key={header.id} className="w-1/6 text-center cursor-pointer flex items-center justify-center gap-1"
                  onClick={header.column.getToggleSortingHandler()}>
                    {header.isPlaceholder ? null : (
                      <>
                        <span>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        {header.column.getCanSort() && (
                          <span className="ml-2">
                            {header.column.getIsSorted() === 'asc' ? (
                              <FaArrowUp />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <FaArrowDown />
                            ) : (
                              <FaUpDown />
                            )}
                          </span>
                        )}
                      </>
                    )}
                  </th>
                ))
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="flex justify-center items-center w-full h-full">
                <td colSpan={6}className="flex justify-center items-center py-4 w-full">
                  <PropagateLoader color="#0ea5e9" size={30} />
                </td>
              </tr>
            ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="flex">
                {row.getVisibleCells().map((cell) => {
                  const isStatusColumn = cell.column.id === 'status';
                  return (
                    <td
                      key={cell.id}
                      className={`w-1/6 text-center py-3 ${
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
    </>
  )
}
export default OrdersTable