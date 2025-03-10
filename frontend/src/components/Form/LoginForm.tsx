import { Formik,Form, Field, ErrorMessage } from "formik"
import axiosAPI from "../../utils/axios-api"
import * as Yup from "yup"
import { useState,useEffect } from "react"
import { useStateContext } from "../../utils/ContextProvider";
import { NavLink, useNavigate } from "react-router-dom";

interface ErrorType {
  message: string;
}

const LoginForm = () =>{
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState<ErrorType>({ message: '' });
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (errors.message) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setErrors({ message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);
  return (
    <Formik
    initialValues={{
      email: "admin@email.com",
      password: "1234",
    }}
    onSubmit={(values, { setSubmitting }) => {
      axiosAPI.post('/login', values)
      .then((response) => {
          console.log(response.data)
          if(response.status === 200){
            const {firstname,lastname,middlename,id,email,role} = response.data.user
            setUser({
              firstname,
              middlename,
              lastname,
              id,
              email,
              role,
              permissions: response.data.permissions
            })
            setToken(response.data.token)
            navigate('/dashboard')
          }
      })
        .catch(error => {
          setErrors(error.response.data)
          setShowError(true)
        })
        .finally(() => {
          setSubmitting(false)
        })
    }}
    validationSchema={Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    })}
    >
      {({isSubmitting}) => (
        <Form>
          <div className="flex flex-col gap-2">
          <Field type="text" name="email" className="border rounded p-2 w-full" placeholder="Email"/>
          <ErrorMessage name="email" component="div" className="text-red-500"/>
          <Field type="password" name="password" className="border rounded p-2 w-full" placeholder="Password"/>
          <ErrorMessage name="password" component="div" className="text-red-500"/>
          {(errors.message && showError) && (
            <div className="text-red-500">
              {errors.message}
            </div>
          )}
          <button type="submit" className="bg-lime-300 border rounded-md mt-8 p-2" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
          </div>
        </Form>
      )}
    </Formik>
  )
         
}
export default LoginForm