import { useState } from "react";
import axiosAPI from "../../utils/axios-api";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  // const {emailError,passwordError} = errors;
  const onSubmitLogin = (e: any) => {
    e.preventDefault();
    const payload = {
      email,
      password
    }
    console.log(payload);

    axiosAPI.post('/login', payload)
      .then(({ data }) => {
        console.log(data)
      })
      .catch((err) => {
        const response = err.response.data;
        setErrors(response.errors);
      })

    console.log(errors);
  }
  return <>
    <form action="#" method="POST">
      <div className="flex flex-col gap-4 pt-5">
        <input type="text" name="email" id="email" placeholder="Email" className="border rounded p-2" value={email} onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email &&
          <p className="text-red-500">{errors.email}</p>
        }
        <input type="password" name="password" id="password" placeholder="Password" className="border rounded p-2" value={password} onChange={(e) => setPassword(e.target.value)}/>
        {errors.password &&
          <p className="text-red-500">{errors.password}</p>
        }
        <button className="bg-lime-300 border rounded-md mt-8 p-2" onClick={onSubmitLogin}>
          Login
        </button>
      </div>
    </form>
  </>
}
export default LoginForm