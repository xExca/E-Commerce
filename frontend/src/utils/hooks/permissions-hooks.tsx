import {useState,useEffect} from "react";
import axiosAPI from "../../utils/axios-api";


export const useGetAllRoles = () => {
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    axiosAPI.get("/admin/roles")
    .then((response) => {
      setRoleList(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
  
  return roleList;
}

export const useGetAllPermissions = () =>{
  const [permissionList, setPermissionList] = useState([]);
}