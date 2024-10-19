
const LoginForm = () => {
  const onLoginSubmit = (e: any) =>{
    e.preventDefault();
    console.log("Hello");
  }
  return <>
    <form action="#" method="POST">
      <div className="flex flex-col gap-4 pt-5">
        <input type="text" name="email" id="email" placeholder="Email" className="border rounded p-2"/>
        <input type="password" name="password" id="password" placeholder="Password" className="border rounded p-2"/>
        <button className="bg-lime-300 border rounded-md mt-8 p-2" onClick={onLoginSubmit}>
          Login
        </button>
      </div>
    </form>
</>
}
export default LoginForm