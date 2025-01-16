import React, { useEffect, useState } from 'react';
import { useGetDataAPI } from '../utils/hooks/useAPI-hooks';
import { useStateContext } from '../utils/ContextProvider';


const ShoppingCart = () => {
  const { user } = useStateContext();
  const { data, isLoading } = useGetDataAPI('admin/cart', user?.id ?? 0);
  const [ cart, setCartData]  = useState<any>();
  console.log(cart);
  useEffect(() => {
    if(!isLoading){
      setCartData(data);
    }

  },[data,isLoading])
  return (
    <div className="p-4 mx-52">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className='flex gap-4'>
        <div className="space-y-4 w-3/4">
        {cart?.map((item: any) => (
            <>
              <div className="grid grid-cols-5 items-center gap-4 border-b pb-4">
                <div className='col-span-2 flex flex-row gap-4'>
                  <div>
                    <img
                      src="https://placehold.co/200x200"
                      alt="Product Image"
                      className="w-[150px] h-[150px] object-cover"
                    />
                  </div>
                  <div className='flex flex-col justify-center align-middle'>
                    <h3 className="text-lg font-semibold">AMD Stock Heatsink Fan</h3>
                    <p className="text-gray-600">Color: Black</p>
                    <p className="text-gray-600">Id {item.id}</p>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-row items-center space-x-2'>
                    <button className="px-2 py-1 border rounded">-</button>
                    <p className="text-gray-800">1</p>
                    <button className="px-2 py-1 border rounded">+</button>
                  </div>
                  {item.quantity === 0 && <p className="text-red-500">Out of stock</p>}
                </div>
                <div>
                  <p className="text-gray-800">Price: ₱140.00</p>
                </div>
                <div>
                  <button className="text-black hover:bg-red-400 transition duration-200 rounded-md p-1">Delete</button>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="mt-8 border-t pt-4 w-1/4">
          <textarea
            placeholder="Add a note to your order"
            className="w-full p-2 border rounded mb-4"
          ></textarea>
          <h3 className="text-xl font-bold mb-2">Cart Total: ₱{"10000"}</h3>
          <label className="flex items-start space-x-2 mb-4">
            <input type="checkbox" className="form-checkbox mt-1" />
            <span>Do you need an alibi in your package, in the form of 'Congratulations on winning this item'?</span>
          </label>
          <div className="flex space-x-4 mb-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Local Delivery
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Store Pickup
            </button>
          </div>
          <p className="text-red-500 mb-4">
            Sorry, your selected items are not currently available for delivery.
          </p>
          <button className="w-full px-4 py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
