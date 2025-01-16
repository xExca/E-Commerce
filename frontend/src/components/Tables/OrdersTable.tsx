import { Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axiosAPI from "../../utils/axios-api";
import Swal from "sweetalert2";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { PropagateLoader } from "react-spinners";
import { MdDeleteForever } from "react-icons/md";
import { FaArrowDown, FaArrowUp, FaFile } from "react-icons/fa";
import TablePaginate from "../../utils/tables/TablePaginate";
import { FaUpDown } from "react-icons/fa6";
import { useGetDataAPI } from "../../utils/hooks/useAPI-hooks";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikFlatpickr, FormikSelectField, FormikTextField } from "../../utils/forms/InputComponents";

type Props = {
  orders?: Order[];
  isLoading: boolean;
};

type Order = {
  id: number;
  user: string;
  product_name: string;
  total_price: number;
  status: string;
  date_ordered: string;
};
const OrdersTable = ({ orders, isLoading }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Id, setId] = useState<number | null>(null);
  const [data, setData] = useState<Order | null>(null);

  const deleteOrder = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosAPI.delete(`/admin/orders/${id}`)
          .then((response) => {
            console.log(response.data);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          }).catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const { data: fetchedData, isLoading: isFetching } = useGetDataAPI("admin/orders", Id ?? 0, {
    enabled: Id !== null, 
  });

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
      setIsModalOpen(true); 
    }
  }, [fetchedData]);

  const getOrderData = (id: number) => {
    setId(id); 
  };

  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
    setId(null); // Reset the selected ID
    setData(null); // Reset the fetched data
  };

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
          <button onClick={() => getOrderData(row.original.id)} className="text-blue-500 hover:text-blue-700 transition duration-200 border border-blue-500 rounded-md p-1 text-2xl"><FaFile /></button>
          <button onClick={() => deleteOrder(row.original.id)} className="text-red-500 hover:text-red-700 transition duration-200 border border-red-500 rounded-md p-1 text-2xl"><MdDeleteForever /></button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: orders ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

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
                <td colSpan={6} className="flex justify-center items-center py-4 w-full">
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
                        className={`w-1/6 text-center py-3 ${isStatusColumn ? 'font-semibold' : ''}`}
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

      <Modal
        open={isModalOpen}
        onClose={() => handleClose()}
        aria-labelledby="order-modal-title"
        aria-describedby="order-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg w-[500px]">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsModalOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <Formik
            initialValues={{
              id: data?.id,
              user: data?.user,
              date_ordered: data?.date_ordered,
              total_price: data?.total_price,
              status: data?.status,
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
            validationSchema={Yup.object({
              user: Yup.string().required('User is required'),
              date_ordered: Yup.date().required('Date Ordered is required'),
              total_price: Yup.number().required('Total Price is required'),
              status: Yup.string().required('Status is required'),
            })}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="mb-4">
                  <Typography className="text-2xl font-bold">
                    Order ID: {values.id}
                  </Typography>
                </div>
                <div className="mb-4">
                  <Field
                    type="text"
                    id="user"
                    name="user"
                    label="User"
                    value={values.user}
                    component={FormikTextField}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    type="text"
                    id="date_ordered"
                    name="date_ordered"
                    label="Date Ordered"
                    component={FormikFlatpickr}
                    value={values.date_ordered}
                    className="mt-1 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    type="text"
                    id="total_price"
                    name="total_price"
                    value={values.total_price}
                    component={FormikTextField}
                    label="Total Price"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    label="Status"
                    component={FormikSelectField}
                    value={values.status}
                    onChange={(e: any) => setFieldValue('status', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </Field>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default OrdersTable;
