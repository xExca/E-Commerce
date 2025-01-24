import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axiosAPI from "../../utils/axios-api"
import Swal from "sweetalert2"
import TextError from "../TextError"

interface EmailValidationResponse {
  exists: boolean;
}

const SignUpForm = () => {
  return (
    <Formik
      initialValues={{
        firstname: "Onin",
        middlename: "Monte",
        lastname: "Austral",
        username: "",
        email: "",
        password: "123",
        password_confirmation: "123",
        phNumbers: [''],
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(`Payload`, values)
        axiosAPI.post('/register', values)
          .then((response) => {
            if (response.data.success) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/login"
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Something went wrong",
              text: error.response.data.message,
              showConfirmButton: false,
            });
          })

        setSubmitting(false);

      }}
      validationSchema={Yup.object({
        firstname: Yup.string().required("Required!"),
        middlename: Yup.string().required("Required!"),
        lastname: Yup.string().required("Required!"),
        username: Yup.string().required("Required!"),
        email: Yup.string().email("Invalid email address").required("Required!"),
        password: Yup.string().required("Required!"),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Required!"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex flex-col gap-4 pt-5 md:pt-10 lg:pt-15">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Field type="text" name="firstname" id="firstname" placeholder="First name" className="border rounded p-2" aria-label="First name" aria-required="true" />
              <Field type="text" name="middlename" id="middlename" placeholder="Middle name" className="border rounded p-2" aria-label="Middle name" aria-required="true" />
              <Field type="text" name="lastname" id="lastname" placeholder="Last name" className="border rounded p-2" aria-label="Last name" aria-required="true" />
              <ErrorMessage name="firstname" component={TextError} />
              <ErrorMessage name="middlename" component={TextError} />
              <ErrorMessage name="lastname" component={TextError} />
            </div>
            <Field type="text" name="username" id="username" placeholder="Username" className="border rounded p-2" aria-label="Username" aria-required="true" />
            <ErrorMessage name="username" component={TextError} />
            <Field type="text" name="email" id="email" placeholder="Email" className="border rounded p-2" aria-label="Email" aria-required="true" />
            <ErrorMessage name="email" component={TextError} />
            <Field type="password" name="password" id="password" placeholder="Password" className="border rounded p-2" aria-label="Password" aria-required="true" />
            <ErrorMessage name="password" component={TextError} />
            <Field type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" className="border rounded p-2" aria-label="Confirm Password" aria-required="true" />
            <ErrorMessage name="password_confirmation" component={TextError} />
            <button type="submit" className="bg-lime-300 border rounded-md mt-8 p-2" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm