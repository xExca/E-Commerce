import { Navigate } from "react-router-dom";

type Props ={
  children: React.ReactNode,
  allowedRoles: string,
  permission: string[]
}
const ProtectedRoute = ({ children, allowedRoles, permission }: Props) => {
  console.log(permission, allowedRoles);
  console.log(!permission.includes(allowedRoles));
  if (!permission.includes(allowedRoles)) {
  return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;