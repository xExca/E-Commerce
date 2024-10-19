
const SignUpForm = () => {
  return (
    <form action="#" method="POST">
      <div className="flex flex-col gap-4 pt-5">
        <input type="text" name="username" id="username" placeholder="Username" className="border rounded p-2"/>
        <input type="text" name="email" id="email" placeholder="Email" className="border rounded p-2"/>
        <input type="password" name="password" id="password" placeholder="Password" className="border rounded p-2"/>
        <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" className="border rounded p-2"/>
        <button className="bg-lime-300 border rounded-md mt-8 p-2">
          Login
        </button>
      </div>
    </form>
  )
}
export default SignUpForm