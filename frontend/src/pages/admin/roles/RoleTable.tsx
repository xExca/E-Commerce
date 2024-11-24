import { TableContainer, Paper,Table, TableHead, TableRow, TableCell, TableBody, Button, Modal } from "@mui/material"
import axiosAPI from "../../../utils/axios-api";
import { useEffect,useState } from "react";
import { Formik,Form, Field, ErrorMessage } from "formik";
import {TextField} from "@mui/material";
import Select from "react-select";
import Swal from "sweetalert2";
const isLoading = true
type FieldProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
type RoleData = {
  id: number;
  name: string;
  permissions: PermissionData;
}
type PermissionData = {
  value: number;
  label: string;
}

const RoleTable = () => {
  const [roleList, setRoleList] = useState([]);
  const [roleData, setRoleData] = useState<RoleData | null>(null);
  const [open, setOpen] = useState(false);
  const [permissionList, setPermisisonList] = useState([])
  const handleEditModal = async (id: number) => {
    await axiosAPI.get(`/admin/roles/${id}`)
    .then((response) => {
      setRoleData(response.data);
      setOpen(true);
    })
    .catch((error) => {
      console.error(error);
    });
  };
  const handleClose = () => {
    setOpen(false);
    
  }
  const fetchRoleData = async () => {
    await axiosAPI.get("/admin/roles")
    .then((response) => {
      setRoleList(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  const fetchPermissionData = async () => {
    await axiosAPI.get("/admin/permissions")
    .then((response) => {
      setPermisisonList(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  useEffect(() => {
    fetchRoleData();
    fetchPermissionData();
  }, []);



  if (!isLoading) return <div>Loading...</div>
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell align="center" colSpan={2}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleList.map((role: any) => (
              <TableRow>
              <TableCell>{role.label}</TableCell>
              <TableCell align="center">
                <div className="flex flex-row items-center justify-center gap-3">
                  <Button variant="contained" color="primary" onClick={()=>handleEditModal(role.id)}>Edit</Button>
                  <Button variant="contained" color="secondary" href="#">Delete</Button>
                </div></TableCell>
            </TableRow>
            ))}
           </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-black shadow-lg p-4">
            <Formik
            initialValues={{
              id: roleData?.id,
              rolename: roleData?.name,
              permission: roleData?.permissions
            }}
            onSubmit={(values)=>{
              axiosAPI.put(`admin/roles/${values.id}`, values)
              .then((response) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: response.data.message,
                  showConfirmButton: false,
                  timer: 1500,
                });
                fetchRoleData();
                handleClose();
              }).catch((error) => {
                console.error(error);
              });
            }}
            >
            {({values}) => (
              <Form>
                <Field name="rolename">
                  {({field,form:{isSubmitting}}: {field: FieldProps, form: {isSubmitting: boolean}}) => (
                    <TextField
                      {...field}
                      value={field.value}
                      label="Rolename"
                      variant="outlined"
                      fullWidth
                      disabled={isSubmitting}
                    />
                  )}
                </Field>
                <ErrorMessage name="rolename" component="div" className="text-red-500" />
                <Select
                options={permissionList}
                value={values.permission}
                isMulti
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
              </Form>
            )}
            </Formik>
        </div>
      </Modal>
    </div>

  )
}
export default RoleTable