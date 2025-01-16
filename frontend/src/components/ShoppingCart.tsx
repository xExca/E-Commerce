import React, { useEffect, useState } from 'react';
import { usePostAPI, useGetDataAPI, useDeleteAPI } from '../utils/hooks/useAPI-hooks';
import { useStateContext } from '../utils/ContextProvider';

type AddToCartPayload = {
  product_id: number;
  user_id: number;
}

type DeleteMutation = {
  product_id: number;
  user_id: number;
  action?: string;
};
const ShoppingCart = () => {
  const { user } = useStateContext();
  const { data, isLoading } = useGetDataAPI('user/cart', user?.id ?? 0);
  const [ cart, setCartData]  = useState<any>();

  useEffect(() => {
    if(!isLoading){
      setCartData(data);
    }

  },[data,isLoading])
  
  const mutation = usePostAPI('/user/cart/quantity');
  const deleteMutation = useDeleteAPI('user/cart');
  console.log(cart);
  const handleAddQuantity = (product_id: number) => {
    setCartData((prevCart: any) =>
      prevCart.map((item: any) =>
        item.product.id === product_id
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  
    mutation.mutate(
      { product_id: product_id, user_id: user?.id ?? 0, action: 'increment' },
      {
        onError: (error) => {
          console.error("Error adding quantity:", error);
          setCartData((prevCart: any) =>
            prevCart.map((item: any) =>
              item.product.id === product_id
                ? { ...item, quantity: item.quantity - 1 } 
                : item
            )
          );
        },
        onSuccess: () => {
          console.log("Quantity added successfully");
        }
      }
    );
  };

  const handleMinusQuantity = (product_id: number) => {
    setCartData((prevCart: any) =>
      prevCart.map((item: any) =>
        item.product.id === product_id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  
    mutation.mutate(
      { product_id: product_id, user_id: user?.id ?? 0, action: 'decrement' },
      {
        onError: (error) => {
          console.error("Error decreasing quantity:", error);
          setCartData((prevCart: any) =>
            prevCart.map((item: any) =>
              item.product.id === product_id
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          );
        },
      }
    );
  };
  const handleDeleteProduct = (cart_id: number) => {
    const previousCart = [...cart];
  
    // Optimistically remove the item from the cart
    setCartData((prevCart: any) =>
      prevCart.filter((item: any) => item.id !== cart_id)
    );
  
    // Use the delete mutation
    deleteMutation.mutate(
      { card_id:cart_id, user_id: user?.id ?? 0 }, // Pass the object payload
      {
        onError: (error) => {
          console.error("Error deleting product:", error);
          // Revert the cart data on error
          setCartData(previousCart);
        },
        onSuccess: () => {
          console.log("Product deleted successfully");
        },
      }
    );
  };
  
  

  return (
    <div className="p-4 mx-52">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className='flex gap-4'>
        <div className="space-y-4 w-3/4">
          {cart && cart.length > 0 ? (
            cart?.map((item: any) => (
              <>
                <div className="grid grid-cols-5 items-center gap-4 border-b pb-4">
                  <div className='col-span-2 flex flex-row gap-4'>
                    <div>
                      <img
                        // src={item.product.image}
                        src = "https://placehold.co/200x200"
                        onError={(e) => (e.currentTarget.src = '')}
                        alt="Product Image"
                        className="w-[150px] h-[150px] object-cover max-w-[150px] max-h-[150px]"
                      />
                    </div>
                    <div className='flex flex-col justify-center align-middle'>
                      <h3 className="text-lg font-semibold">{item.product.name}</h3>
                      <p className="text-gray-600">Color : {item.product.color}</p>
                      <p className="text-gray-600">Brand :  {item.product.brand}</p>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-row items-center space-x-2'>
                      <button className="p-2 border rounded disabled:text-gray-400" onClick={() => handleMinusQuantity(item.product.id)} disabled={item.quantity === 1}>-</button>
                        <p className="text-gray-800">{item.quantity}</p>
                      <button className="p-2 border rounded" onClick={() => handleAddQuantity(item.product.id)}>+</button>
                    </div>
                    {item.quantity === 0 && <p className="text-red-500">Out of stock</p>}
                  </div>
                  <div>
                    <p className="text-gray-800">Price: ₱{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div>
                    <button className="text-black hover:bg-red-400 transition duration-200 rounded-md p-1" onClick={() => handleDeleteProduct(item.id)}>Delete</button>
                  </div>
                </div>
              </>
            ))
          ) : (
            <p>No items yet</p>
          )}
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
