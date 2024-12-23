import { useEffect, useState } from "react"
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody,Modal, TablePagination, Button } from "@mui/material";

import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import Swal from "sweetalert2";
import { MdDelete, MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { useStateContext } from "../../utils/ContextProvider";
import { useGetAllRoles } from "../../utils/hooks/permissions-hooks";
import axiosAPI from "../../utils/axios-api";
import { PropagateLoader } from "react-spinners";
import { FaMehRollingEyes } from "react-icons/fa";

type UserData = {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  role: RoleList;
}
type RoleList = {
  value:number;
  label:string;
}
const UserTable = () => {
  const [page, setPage] = useState(0);  // Current page index
  const [rowsPerPage, setRowsPerPage] = useState(5);  // Number of rows per page
  const {user} = useStateContext();
  const [userList, setUserList] = useState<UserData[]>([]);
  const [_user, setUser] = useState<UserData | null>(null);
  const roleList: RoleList[] = useGetAllRoles();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(userList);
  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
 };
 const handleChangeRowsPerPage = (event:any) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);  // Reset the table to the first page whenever rows per page changes
};
  
  const onHandleModal = async (id: number) => {
    await axiosAPI.get(`/admin/users/${id}`)
      .then((response) => {
      setUser(response.data);
      setIsModalOpen(true);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setIsModalLoading(false);
    })
  }
  const onHandleDelete = async (id: number) => {
    await axiosAPI.delete(`/admin/users/${id}`)
    .then((response)=>{
      Swal.fire({
        
      })
    })
  }
  
  const useFetchUserList = async () => {
    await axiosAPI.get("/admin/users")
      .then((response) => {
        setUserList(response.data);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }
  useEffect(() => {
    useFetchUserList();
  }, [])

  return (
    <>
      <div className=" flex flex-1 items-start flex-col overflow-y-auto gap-4">
        <div className="flex flex-row px-4  gap-4">
          <button 
            className="text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold">
              All Orders
            </button>
          <button 
            className="text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold">
              Completed
          </button>
          <button 
            className="text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold">
              Pending
          </button>
          <button 
            className="text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold">
              Cancel
          </button>
        </div>
        <div className="h-full w-full max-h-[48rem] overflow-y-auto">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="flex">
                <th className="w-1/4 text-center">ID</th>
                <th className="w-1/4 text-center">Customer Name</th>
                <th className="w-1/4 text-center">Email</th>
                <th className="w-1/4 text-center">Role</th>
                <th className="w-1/4 text-center">Action</th>
              </tr>
            </thead>
            <div className="max-h-[35rem] overflow-y-auto">
              <table className="min-w-full table-fixed h-[35rem]">
                <tbody className="items-center">
                {!isLoading ? (
                  userList.map((user) => (
                    <tr key={user.id} className="border-b last:border-b-0 flex">
                      <td className="w-1/4 text-center py-3">{user.id}</td>
                      <td className="w-1/4 text-center py-3">{user.firstname}</td>
                      <td className="w-1/4 text-center py-3">{user.email}</td>
                      <td className="w-1/4 text-center py-3">Admin</td>
                      <td className="w-1/4 text-center pr-8 py-2">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={()=>{onHandleModal(user.id)}} className="text-blue-500 hover:text-blue-700 transition duration-200 border border-blue-500 rounded-md p-1 text-2xl"><FaMehRollingEyes /></button>
                          <button className="text-red-500 hover:text-red-700 transition duration-200 border border-red-500 rounded-md p-1 text-2xl" onClick={() => onHandleDelete(user.id)}><MdDeleteForever /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      <PropagateLoader color="#36d7b7" />
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </table>
        </div>
      </div>

      <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-black shadow-lg p-4">
            <Formik
              initialValues={{
                firstname: _user?.firstname || "",
                middlename: _user?.middlename || "",
                lastname: _user?.lastname || "",
                email: _user?.email || "",
                role: {
                  value: _user?.role.value || 0,
                  label: _user?.role.label || ""
                },
              }}  
              onSubmit={(values, { setSubmitting }) => {
                axiosAPI.put(`/admin/users/${_user?.id}`, values)
                .then((response) => {
                  Swal.fire({
                    icon: "success",
                    title: "User updated successfully",
                    text: response.data.message,
                    showConfirmButton: false,
                  })
                })
                .catch((error) => {
                  Swal.fire({
                    icon: "error",
                    title: "Error updating user",
                    text: error.response.data.message,
                    showConfirmButton: false,
                  })
                })
                .finally(() => {
                  useFetchUserList();
                  setIsModalOpen(false);
                  setSubmitting(false);
                });
              }}
              validationSchema={Yup.object({
                firstname: Yup.string().required("First Name is required"),
                middlename: Yup.string().required("Middle Name is required"),
                lastname: Yup.string().required('Last Name is required'),
                email: Yup.string().required('email is required'),
              })}
            >
              {({values, setFieldValue}) => (
                <Form className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="firstname">First Name</label>
                  <Field name="firstname" placeholder="First Name" className="border-2 border-black rounded-md p-2" />
                  <ErrorMessage name="firstname" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="middlename">Middle Name</label>
                  <Field name="middlename" placeholder="Middle Name" className="border-2 border-black rounded-md p-2" />
                  <ErrorMessage name="middlename" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="lastname">Last Name</label>
                  <Field name="lastname" placeholder="Last Name" className="border-2 border-black rounded-md p-2" />
                  <ErrorMessage name="lastname" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <Field name="email" placeholder="Email" className="border-2 border-black rounded-md p-2" />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="role">Role</label>
                  <Select
                    options={roleList}
                    name="role"
                    className="border-2 border-black rounded-md p-2"
                    value={values.role}
                    onChange={(option) => setFieldValue('role', option)}
                  />
                  <ErrorMessage name="role" component="div" className="text-red-500" />
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </Form>
              )}
            </Formik>
        </div>
      </Modal>
          
    </>
  )
}
export default UserTable