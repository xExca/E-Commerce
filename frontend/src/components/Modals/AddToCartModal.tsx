import { Modal } from "@mui/material"
import { FaCheck } from "react-icons/fa"
import { Link } from "react-router-dom"

type Product = {
  id: number,
  name: string,
  color: string,
  brand: string,
  image: string,
  price: number,
  discount: number,
  category: string,
  rating : number
}

type Props = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
  data: Product
}
const AddToCartModal = ({isOpen, setIsOpen,data}: Props) => {
  console.log(data);
  return (
    <Modal
      open={isOpen}
      onClose={() => {setIsOpen(!isOpen)}}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="bg-white rounded-lg p-4 w-[40rem]">
        <div>
          <div className="">
            <span className="flex align-items-center gap-3"><FaCheck size={25} color="green" /> Successfully added to cart</span>
          </div>
          <div className="separator my-2"></div>
          <div>
            <div className="flex gap-4">
              <img src="https://placehold.co/200x200" className="w-[150px] h-[150px] object-contain" onError={(e) => (e.currentTarget.src = 'https://placehold.co/200x200')} alt="Temporary Image" />
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold">{data?.name}</span>
                <span className="text-sm text-gray-500">{data?.color} / {data?.brand}</span>
                <span className="text-lg font-semibold">₱{data?.discount !== undefined ? (data?.price - (data?.price * data?.discount / 100)).toFixed(2) : data?.price}</span>
              </div>
            </div>
          </div>
          <div className="separator my-2"></div>
          <div>
            <div className="flex justify-between gap-2">
              <Link to={"/cart"} className="bg-blue-500 text-white px-4 py-2 rounded-md">View Cart</Link>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-md" onClick={() => {setIsOpen(!isOpen)}}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default AddToCartModal

