import { useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import axiosAPI from "../../utils/axios-api";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";

type PermissionData = {
  id: number;
  name: string;
}
type RoleData = {
  id: number;
  rolename: string;
  permission: {
    value: number;
    label: string;
  }
}
interface FieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const RoleEdit = () => {
  const [roleData, setRoleData] = useState<RoleData | null>(null);
  const [permissionList, setPermissionList] = useState([]);
  const params = useParams();
  const id = params.id

  const fetchRoledata = async () => {
    try {
      const response = await axiosAPI.get(`admin/roles/${id}`);
      setRoleData({
        id: response.data.id,
        rolename: response.data.name,
        permission: response.data.permissions
      });
    } catch (error) {
      console.error(error);
    }
  }

  const fetchRoleList = async () => {
    try {
      const response = await axiosAPI.get("/admin/permissions");
      setPermissionList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  

  useEffect (() => {
    fetchRoledata();
    fetchRoleList();
  }, [])
  if (!roleData) return <div>Loading...</div>;
  return (
    <>
      <Formik
        initialValues={{
          rolename: roleData.rolename,
          permission: roleData.permission
        }}
        onSubmit={(values, { setSubmitting }) => {
          axiosAPI.put(`admin/roles/${id}`, values)
            .then((response) => {
              console.log(response);
              if(response.status === 200) {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: response.data.message,
                }).then(() => {
                  window.location.href = "/admin/roles";
                });
              }
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
        validationSchema={Yup.object({
          rolename: Yup.string().required("Required"),
        })}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="w-[500px]">
            <div className="flex flex-col gap-3">
              <Field name="rolename">
              {({ field, form: { isSubmitting } }: { field: FieldProps, form: { isSubmitting: boolean } }) => (
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
                name="permission"
                options={permissionList}
                isMulti
                value={values.permission}
                onChange={(value) => setFieldValue("permission", value)}
              />

              <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>

    
    </>
  )

}
export default RoleEdit
