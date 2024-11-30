import { useEffect, useState } from "react"
import axiosAPI from "../../../utils/axios-api";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody,Modal, TablePagination, Button } from "@mui/material";
import { useStateContext } from "../../../utils/ContextProvider";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useGetAllRoles } from "../../../utils/hooks/permissions-hooks";
import Select from "react-select";
import Swal from "sweetalert2";

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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
 };
 const handleChangeRowsPerPage = (event) => {
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

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
     <div className="p-4">
     <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Firstname</TableCell>
              <TableCell align="center">Middlename</TableCell>
              <TableCell align="center">Lastname</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.firstname}</TableCell>
                <TableCell align="center">{row.middlename}</TableCell>
                <TableCell align="center">{row.lastname}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.role.label}</TableCell>
                <TableCell align="center">
                  <div className="flex flex-row gap-2">
                    <Button variant="contained" color="primary" onClick={() => onHandleModal(row.id)}>Edit</Button>
                    <Button variant="contained" color="secondary" href="#">Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
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