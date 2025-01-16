type Props = {
  cardSelected:string,
  cardTitle:string
  setCardSelected:(card:string) => void
}
const CardSelector = ({cardSelected,cardTitle, setCardSelected} : Props) => {
  return (
     <div className="flex flex-row px-4 gap-4">
      {cardTitle == "Order" &&
        <>
          <button 
          className={`text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold ${cardSelected === "all" ? "border-b-blue-500 text-blue-500" : "text-gray-600"}`}
          onClick={()=>setCardSelected("all")}>
            All Orders
          </button>
        <button 
          className={`text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold ${cardSelected === "delivered" ? "text-blue-500 border-b-blue-500" : "text-gray-600"}`}
          onClick={()=>setCardSelected("delivered")}>
            Completed
        </button>
        <button 
          className={`text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold ${cardSelected === "pending" ? "text-blue-500 border-b-blue-500" : "text-gray-600"}`}
          onClick={()=>setCardSelected("pending")}>
            Pending
        </button>
        <button 
          className={`text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold ${cardSelected === "cancelled" ? "text-blue-500 border-b-blue-500" : "text-gray-600"}`}
          onClick={()=>setCardSelected("cancelled")}>
            Cancel
        </button>
        </>
      }
      {cardTitle == "Settings" &&
        <>
          <button 
            className={`text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold ${cardSelected === "profile" ? "text-blue-500 border-b-blue-500" : "text-gray-600"}`}
            onClick={()=>setCardSelected("profile")}>
             Profile
          </button>
          <button 
            className={`text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold ${cardSelected === "banks" ? "text-blue-500 border-b-blue-500" : "text-gray-600"}`}
            onClick={()=>setCardSelected("banks")}>
             Banks and Cards
          </button>
          <button 
            className={`text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold ${cardSelected === "address" ? "text-blue-500 border-b-blue-500" : "text-gray-600"}`}
            onClick={()=>setCardSelected("address")}>
             Address
          </button>
          <button 
            className={`text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold ${cardSelected === "password" ? "text-blue-500 border-b-blue-500" : "text-gray-600"}`}
            onClick={()=>setCardSelected("password")}>
             Change Password
          </button>
          <button 
            className={`text-lg hover:text-blue-500 border-b-2 border-transparent hover:border-b-blue-500 font-semibold ${cardSelected === "notifications" ? "text-blue-500 border-b-blue-500" : "text-gray-600"}`}
            onClick={()=>setCardSelected("notifications")}>
             Notification Settings
          </button>
        </>
      }
    </div>
  )
}
export default CardSelector