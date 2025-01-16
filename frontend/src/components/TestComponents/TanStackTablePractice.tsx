import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { data } from '../Tables/data';
import { FaUpDown, FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import TablePaginate from '../../utils/tables/TablePaginate';

type TableData = {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  role: string;
};
// console.log(data);

const TanStackTablePractice = () => {
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      enableSorting: true,
    },
    {
      header: 'Full name',
      accessorFn: (row: TableData) => `${row.firstname} ${row.middlename} ${row.lastname}`,
      enableSorting: true,
    },
    {
      header: 'Email',
      accessorKey: 'email',
      enableSorting: true,
    },
    {
      header: 'Role',
      accessorKey: 'role',
      enableSorting: true,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && (
                    <button
                      className="ml-2"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.column.getIsSorted() === 'asc' ? (
                        <FaArrowUp />
                      ) : header.column.getIsSorted() === 'desc' ? (
                        <FaArrowDown />
                      ) : (
                        <FaUpDown />
                      )}
                    </button>
                  )}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TablePaginate
        canNextPage={table.getCanNextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        nextPage={table.nextPage}
        previousPage={table.previousPage}
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={table.getState().pagination.pageSize}
        setPageSize={table.setPageSize}
        totalEntries={table.options.data.length}
      />
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          First
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last
        </button>
      </div>
    </>
  );
};

export default TanStackTablePractice;

