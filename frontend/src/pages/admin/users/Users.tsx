import { Field, Formik, Form, ErrorMessage } from "formik";
import axiosAPI from "../../../utils/axios-api";
import { useEffect, useState } from "react";
import Select from "react-select";
import * as Yup from "yup";
import { useGetAllRoles } from "../../../utils/hooks/permissions-hooks";

type UserData = {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  role: {
    id: string;
    label: string;
  };
}

const Users = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [roleList, setRoleList] = useState([]);
  const useFetchRoleList = async () => {
    try {
      const response = await axiosAPI.get("admin/roles");
      setRoleList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    useFetchRoleList();
    fetchUserData();
  }, []);


  const fetchUserData = async () => {
    try {
      const response = await axiosAPI.get("admin/users/1");
      setUserData({
        firstname: response.data.firstname,
        middlename: response.data.middlename,
        lastname: response.data.lastname,
        email: response.data.email,
        role: response.data.role
      });

    } catch (error) {
      console.error(error);
    }
  };
  

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center h-full p-6">
      <Formik
        initialValues={{
          firstname: userData.firstname,
          middlename: userData.middlename,
          lastname: userData.lastname,
          email: userData.email,
          role: userData.role,
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(`Payload`, values);
          axiosAPI.put("/admin/users/1", values)
          .then((response) => {
            console.log(response);
          }).catch((error) => {
            console.error(error);
          }).finally(() => {
            setSubmitting(false);
          });
        }}
        validationSchema={Yup.object({
          firstname: Yup.string().required("Required"),
          middlename: Yup.string().required("Required"),
          lastname: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
        })}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="w-[500px]">
            <div className="flex flex-col gap-3">
              <label htmlFor="firstname" className="font-bold">Firstname</label>
              <Field name="firstname" type="text" placeholder="Firstname" className="border rounded p-2 w-full" />
              <ErrorMessage name="firstname" component="div" className="text-red-500" />

              <label htmlFor="middlename" className="font-bold">Middlename</label>
              <Field name="middlename" type="text" placeholder="Middlename" className="border rounded p-2 w-full" />
              <ErrorMessage name="middlename" component="div" className="text-red-500" />

              <label htmlFor="lastname" className="font-bold">Lastname</label>
              <Field name="lastname" type="text" placeholder="Lastname" className="border rounded p-2 w-full" />
              <ErrorMessage name="lastname" component="div" className="text-red-500" />

              <label htmlFor="email" className="font-bold">Email</label>
              <Field name="email" type="email" placeholder="Email" className="border rounded p-2 w-full" />
              <ErrorMessage name="email" component="div" className="text-red-500" />

              <label htmlFor="role" className="font-bold">Role</label>
              <Select
                name="role"
                options={roleList}
                value={roleList.find((option: any) => option.value === values.role.id)}
                onChange={(value) => setFieldValue("role", value)}
              />
              <ErrorMessage name="role" component="div" className="text-red-500" />

              <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Users;
