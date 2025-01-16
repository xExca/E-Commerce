import { useEffect, useState } from "react";
import { useStateContext } from "../../utils/ContextProvider";
import { useGetDataAPI } from "../../utils/hooks/useAPI-hooks";

const TestPage = () => {
  const {user} = useStateContext();
  const { data, isLoading } = useGetDataAPI('user/cart', user?.id ?? 0);
  const [ cart, setCartData]  = useState<any>();

   useEffect(() => {
      if(!isLoading){
        setCartData(data);
      }
  
    },[data,isLoading])
  return (
    <div>TestPage</div>
  )
}
export default TestPage