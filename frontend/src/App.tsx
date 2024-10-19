import { HiOutlineComputerDesktop } from "react-icons/hi2";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

const App = () => {
  return <>
  <div className="flex flex-col h-screen bg-gradient-to-r from-sky-500 to-indigo-500">
    <Navbar />
    <Main />
    <Footer/>
  </div>
  </>
}
export default App