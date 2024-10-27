import { useState } from "react";
import axiosAPI from "../../utils/axios-api";

const SignUpForm = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [middlename, setMiddlename] = useState<string>(""); 
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");
  const [errors,setErrors] = useState({});
  
  const onHandleSignUp = (e: React.MouseEvent<HTMLButtonElement>) =>{
    const payload = {
      firstname,
      middlename,
      lastname,
      username,
      email,
      password,
      confirm_password
    }
    e.preventDefault();
    axiosAPI.post('/signup', payload).then(({data}) => {
      console.log(data);
    }).catch((err) => { 
      const response = err.response.data; 
      setErrors(response.errors);
    });
  }
  return (
    <form action="#" method="POST">
    <div className="flex flex-col gap-4 pt-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input type="text" name="firstname" id="firstname" placeholder="First name" className="border rounded p-2" />
        <input type="text" name="middlename" id="middlename" placeholder="Middle name" className="border rounded p-2" />
        <input type="text" name="lastname" id="lastname" placeholder="Last name" className="border rounded p-2" />
      </div>

      <input type="text" name="username" id="username" placeholder="Username" className="border rounded p-2" />
      <input type="text" name="email" id="email" placeholder="Email" className="border rounded p-2" />
      <input type="password" name="password" id="password" placeholder="Password" className="border rounded p-2" />
      <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" className="border rounded p-2" />
  
      <button className="bg-lime-300 border rounded-md mt-8 p-2" onClick={onHandleSignUp}>
        Register
      </button>
    </div>
  </form>
  )
}
export default SignUpForm