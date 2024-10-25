import { useFormik, Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import TextError from "../TextError"
type Props = {}
const TestingForm = (props: Props) => {

  const initialValues = {
    name: "Jose",
    email: "nino@example.com",
    channel: "Media",
  }
  const onSubmit = (values: any) => {
    console.log("The payload is :", values)
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email address").required("Required!"),
    channel: Yup.string().required("Required!"),
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });


  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-2/6">
        <h2 className="text-2xl font-bold mb-4">Testing Form</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <Field type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="name" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <Field type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="email" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="channel" className="block text-gray-700 font-bold mb-2">Channel</label>
              <Field type="text" id="channel" name="channel" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="channel" component={TextError} />
            </div>
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </Form>
        </Formik>
      </div>
    </div >
  )
}
export default TestingForm