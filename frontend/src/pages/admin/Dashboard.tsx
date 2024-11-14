import { useAuth } from "../../utils/ContextProvider"
import { Navigate } from "react-router-dom"

type Props = {}
const Dashboard = (props: Props) => {
  const test = () => {
    const {setUser, setToken} = useAuth();
    setUser({})
    setToken(null)
    return <Navigate to="/login"/>
  }
  return (
    <>
    <div>Dashboard</div>
    <button onClick={test}>
Logout
    </button>
    </>
  )
}
export default Dashboard