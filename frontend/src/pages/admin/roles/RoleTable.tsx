import axiosAPI from "../../../utils/axios-api"
import { useEffect, useState } from "react";
import { useGetAllPermissions } from "../../../utils/hooks/permissions-hooks";
import { Modal, Box, Typography } from "@mui/material";
import { Formik,Form,Field,ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { GiBulletBill } from "react-icons/gi";
import { LuDot } from "react-icons/lu";
import { IoMdPersonAdd } from "react-icons/io";

type RoleData = {
  value:number
  label: string;
  permission: PermissionData[];
}
type PermissionData = {
  value: number;
  label: string
}

const RoleTable = () => {
  const [roleData, setRoleData] = useState<RoleData[]>([]);
  const [role, setRole] = useState<RoleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const permissionList = useGetAllPermissions();

  const onHandleModal = async (id: number) => {
    await axiosAPI.get(`/admin/roles/${id}`)
    .then((response)=>{
      setRole({
        value: response.data.id,
        label: response.data.name,
        permission: response.data.permissions
      })
      setIsModalOpen(true)
    }).catch((error)=>{
      console.log(error)
    });
  }
  useEffect(() => {
    axiosAPI.get("/admin/roles")
    .then((response)=>{
      setRoleData(response.data);
    }).catch((error)=>{
      console.log(error)
    });
  },[])

  return (
    <>
    <div className="grid grid-cols-4 gap-4 whitespace-nowrap">
      <div className="bg-red-300 rounded-md p-4 w-full max-h-full flex items-center justify-center flex-col">
        <button onClick={()=>{console.log('test')}}>
          <div className="mx-auto"><IoMdPersonAdd size={120} /></div>
          <div className="mx-auto text-xl">Test</div>
        </button>
      </div>
      {[...Array(24)].map((_,i)=>(
        <div key={i} className="bg-blue-300 rounded-md p-4 w-full h-auto flex flex-col gap-3">
          <div>
            <p className="font-bold text-xl"> Lorem</p>
            <p className="text-sm">Total of users with this role:{i}</p>
          </div>
          <div className="p-2 bg-slate-300 rounded-md">
              <p className="text-sm font-bold pl-2">Permissions</p>
              <div className="flex flex-col overflow-x-auto h-[150px]">
                {[...Array(10)].map((_,i)=>(
                  <div className="flex flex-row gap-2 items-center">
                    <div><LuDot className="text-3xl"/></div>
                    <div>Lorem ipsum dolor sit amet</div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      ))}
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
            id: role?.value ?? "",
            role: role?.label ?? "",
            permissions: role?.permission ?? [],
          }}
          onSubmit={(values) => {
            console.log(values)
          }}
          validationSchema={Yup.object({
            role: Yup.string().required("Role is required"),
          })}
          >
            {({values, setFieldValue}) => (
              <Form>
              <Field type="text" name="role" />
              <ErrorMessage name="role" component="div" />
              <Select
                options={permissionList}
                value={values.permissions}
                onChange={(e) => setFieldValue("permissions", e)}
                isMulti
              />
              <button type="submit">Submit</button>
            </Form>      
            )}      
          </Formik>
        </div>
      </Modal>
    </>
  )
}
export default RoleTable