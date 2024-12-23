import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { Link } from "react-router-dom";
import LoginForm from "./Form/LoginForm";
import React from "react";
import SignUpForm from "./Form/SignUpForm";


const MainDefault = () => {
  const [type, setType] = React.useState("Login");
  
  return (
    <main className="flex-1 overflow-y-auto grid grid-cols-2 grid-rows-1 gap-0">
      <div className="row-span-2 items-center justify-center flex">
        <HiOutlineComputerDesktop className="text-white text-9xl" />
      </div>
      <div className="row-span-2 items-center justify-center flex">
        <div className="w-6/12 h-auto bg-white shadow-2xl rounded-md flex flex-col p-10 gap-11">
          <p className="text-black text-left text-xl">{type}</p>
          <div className="form" id="form">
            {type == "Login" ? <LoginForm /> : <SignUpForm />}
          </div>
          <div className="flex justify-end">
            <button onClick={() => setType(type == "Login" ? "Register" : "Login")} className="text-blue-500 hover:text-blue-600">{type == "Login" ? "Register" : "Login"}</button>
          </div>
        </div>
      </div>
    </main>
  )
}
export default MainDefault