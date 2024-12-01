import { MdPerson3 } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="py-2 px-4 h-14 bg-white flex justify-between items-center">
      <h1 className="text-xl">Navbar</h1>
     
        <div className="relative">
          <button type="button" className="flex items-center gap-2" >
            <MdPerson3 size={24} />
          </button>
            <div className="absolute right-0 mt-4 w-48 shadow-lg rounded-lg bg-slate-50">
              <p className="px-4 py-2 border-b cursor-pointer hover:bg-emerald-100 hover:rounded-t-lg">Profile</p>
              <p className="px-4 py-2 cursor-pointer hover:bg-emerald-100 hover:rounded-b-lg" >Logout</p>
            </div>
        </div>
    </nav>
  )
}
export default Navbar
