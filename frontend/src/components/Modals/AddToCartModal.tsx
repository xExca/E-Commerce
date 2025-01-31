import { Modal } from "@mui/material"
import { FaCheck } from "react-icons/fa"
import { Link } from "react-router-dom"
import ColorPicker from "../ColorPicker"
import { useState } from "react"

type Product = {
  id: number,
  name: string,
  colors: Color[],
  brand: string,
  image: string,
  price: number,
  discount: number,
  category: string,
  rating : number
}
type Color = {
  name: string,
  id: number
  sizes: Size[]
}
type Size = {
  name: string,
  id: number,
  quantity: number
}

type Props = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
  data: Product
}
const AddToCartModal = ({isOpen, setIsOpen,data}: Props) => {
  const [selectedColor, setSelectedColor] = useState<string | null>('black');
  const colorsList = data?.colors?.map((color) => ({ color: color.name, id: color.id }));
  const sizes = data?.colors?.map(color => color.sizes);
  console.log(data);
  const handleColorClick = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor("");
    } else {
      setSelectedColor(color);
    }
  };
  const uniqueSizes = Array.from(
    new Map(
      data?.colors
        .flatMap(color => color.sizes)
        .map(size => [size.name, size]) // Use size name as the key for uniqueness
    ).values()
  );
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
                <span className="text-sm text-gray-500">{"Red"} / {data?.brand}</span>
                <span className="text-lg font-semibold">₱{data?.discount !== undefined ? (data?.price - (data?.price * data?.discount / 100)).toFixed(2) : data?.price}</span>
                <div>
                  <span>Variant</span>
                  <ColorPicker selectedColor={selectedColor} handleColorClick={handleColorClick} listColors={colorsList} />
                </div>
                <div>
                  <span>Size</span>
                  <div className="flex flex-row">
                    {uniqueSizes.map(size => (
                      <button
                        key={size.id}
                        className={`m-1 p-2 border border-gray-400 rounded ${data.colors.find(color => color.name === selectedColor)?.sizes.some(s => s.name === size.name) ? 'bg-green-100' : 'bg-gray-300 disabled:cursor-not-allowed'}`}
                        disabled={!data.colors.find(color => color.name === selectedColor)?.sizes.some(s => s.name === size.name)}
                        onClick={() => console.log(size.id)}
                      >
                        {size.name}
                        
                      </button>
                    ))}
                  </div>
                  
                </div>
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

