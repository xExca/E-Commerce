const Main = () => {
  const onLoginSubmit = (e: any) =>{
    e.preventDefault();
    console.log("Logged in")
  }
  return (
    <main className="flex-1 overflow-y-auto grid grid-cols-2 grid-rows-1 gap-0">
        <div className="row-span-2 "> </div>
        <div className="row-span-2 items-center justify-center flex">
          <div className="w-6/12 h-3/6 bg-white shadow-2xl rounded-md flex flex-col p-10 gap-11">
            <p className="text-black text-left text-xl">Login</p>
            <form action="#" method="POST">
            <div className="flex flex-col gap-4 pt-5">
              <input type="text" name="email" id="email" placeholder="Email" className="border rounded p-2"/>
              <input type="password" name="password" id="password" placeholder="Password" className="border rounded p-2"/>
              <button className="bg-lime-300 border rounded-md mt-8 p-2" onClick={onLoginSubmit}>
                Login
              </button>
            </div>
            </form>
            <div className="flex justify-between">
              <a>Forget password</a>
              <a>Sign up</a>
            </div>
          </div>
        </div>
    </main>
  )
}
export default Main