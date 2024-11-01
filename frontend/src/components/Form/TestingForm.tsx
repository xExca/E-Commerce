import { useFormik, Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup"
import TextError from "../TextError"
type Props = {}
const TestingForm = (props: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-2/6">
        <h2 className="text-2xl font-bold mb-4">Testing Form</h2>
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
            // axiosAPI.post('/register', values)
            //   .then((response) => {
            //     if (response.data.success) {
            //       Swal.fire({
            //         position: "center",
            //         icon: "success",
            //         title: "Your work has been saved",
            //         showConfirmButton: false,
            //         timer: 1500
            //       });
            //     }
            //   })
            //   .catch((error) => {
            //     console.log(error)
            //   })

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
                <FieldArray name="phNumbers">
                  {
                    (fieldArrayProps) => {
                      console.log(`Field Array`, fieldArrayProps)
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { phNumbers } = values
                      return (
                        <div>
                          {
                            phNumbers.map((phNumber, index) => (
                              <div key={index}>
                                <Field name={`phNumbers[${index}]`} />
                                {index > 0 &&
                                  <button type='button' onClick={() => remove(index)}> {' '} -{' '}</button>
                                }
                                <button type='button' onClick={() => push('')}> + </button>
                              </div>
                            ))
                          }
                        </div>
                      )
                    }
                  }
                </FieldArray>
                <button type="submit" className="bg-lime-300 border rounded-md mt-8 p-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Login'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div >
  )
}
export default TestingForm