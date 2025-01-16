import React, { useEffect, useState } from 'react';
import { useGetAPI, useGetDataAPI } from '../utils/hooks/useAPI-hooks';
import Footer from '../components/Footer';
import { HomeNavbar } from '../components/Navbar';
import ShoppingCart from '../components/ShoppingCart';
import AddToCartModal from '../components/Modals/AddToCartModal';
import { ref } from 'yup';
import axiosAPI from '../utils/axios-api';
import { useStateContext } from '../utils/ContextProvider';

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

type Filter = {
  price: {
    min: number | null
    max: number | null
  },
  color:string | null,
  brand:string[] | null,
  category:string[] | null,
  id: number | null,
  rating: number | null
}

const Home = () => {
  const {user} = useStateContext();
  const [selectedColor, setSelectedColor] = useState<string | null>('black');
  const [filterBrandShow, setFilterBrandShow] = useState<boolean>(false);
  const [filterCategoryShow, setFilterCategoryShow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>({
    price: {
      min: null,
      max: null,
    },
    color: null,
    brand: [],
    category: [],
    id: null,
    rating: null
  });
  
  const { data: productsData } = useGetAPI(`admin/products`);
  const { data: filters } = useGetAPI(`admin/filter`);
  const { data: selectedData, isLoading, error } = useGetDataAPI('/admin/products', selectedId || 0, {
      enabled: !!selectedId, // Prevent query execution without an ID
    });

  const handleColorClick = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor(null);
      setFilter((prev) => ({
        ...prev,
        color: null,
      }));
    } else {
      setSelectedColor(color);
      setFilter((prev) => ({
        ...prev,
        color: color,
      }));
    }
  };
  const filterData: Product[] = (productsData ?? []).filter((item: Product) => {
    if (!filter) {
      return true;
    }
    
    const { price: { min, max }, color,brand,category,id, rating } = filter;
    return (
      (id === null || item.id === id) &&
      (min === null || item.price >= min) &&
      (max === null || item.price <= max) &&
      (color === null || item.color === color) &&
      ((brand === null || brand.length === 0) || brand.includes(item.brand)) &&
      ((category === null || category.length === 0) || category.includes(item.category)) &&
      (rating === null || item.rating >= rating)
    );
  });

  const ColorPicker = () => {
    const colors = ['black', 'pink', 'purple', 'white', 'yellow'];
    
    return (
      <div className="flex space-x-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full ${
              selectedColor === color
                ? 'border-2 border-blue-500' // Add circle border for selected color
                : 'border border-gray-200'
            }`}
            style={{ backgroundColor: color }} // Set background color
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) == 0 ? null : Number(e.target.value);
    setFilter((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [e.target.name]: value, 
      },
    }));
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement & { name: keyof Filter; value: Filter[keyof Filter] }>) => {
    const { name, value, checked } = e.target;

    setFilter((prev) => ({
      ...prev,
      [name]: checked
        ? (Array.isArray(prev[name]) ? prev[name] : []).concat(value)
        : Array.isArray(prev[name]) ? prev[name].filter((item) => item !== value) : prev[name],
    }));
  };
  
 
  const handleAddToCart = (id: number) => {
    setSelectedId(id);
    setIsOpen(true);
    axiosAPI.post('/admin/cart', {product_id: id, quantity: 1, user_id: user?.id})
    .then((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  return (
    <>
    <main className="container mx-auto p-4">
    <div className="w-full flex gap-4">
      <aside className="h-full overflow-y-auto bg-white p-4 rounded shadow flex flex-col">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <h3 className="font-medium">Price, ₱</h3>
          <div className="flex justify-between">
            <input type="text" placeholder="Min" name="min" className="border p-2 rounded w-full" onChange={(e)=>handleChange(e)}/>
            <span className="align-middle p-2 text-xl">-</span>
            <input type="text" placeholder="Max" name="max" className="border p-2 rounded w-full" onChange={(e)=>handleChange(e)} />
          </div>
        </div>
        {filters?.brand && (
          <div className="mb-4">
          <h3 className="font-medium">Brand</h3>
          <ul>
            {filters.brand.slice(0, (filters.brand.length > 10 && !filterBrandShow ? 10 : filters.brand.length)).map((item: any) => (
              <li key={item.brand}>
                <input type="checkbox" id={`brand-${item.brand}`} name="brand" value={item.brand} onChange={(e) => handleFilterChange(e)} /> 
                <label htmlFor={`brand-${item.brand}`}> {item.brand}</label>
              </li>
            ))}
          </ul>
          {filters.brand.length > 10 && (
            <button className="text-blue-500 hover:text-blue-700 transition duration-200 borderp-1 text-sm" onClick={() => setFilterBrandShow(!filterBrandShow)}> Show {filterBrandShow ? "Less" : "More"}</button>
          )}
        </div>
        ) 
        }
        {filters?.category && (
          <div className='mb-4'>
            <h3 className="font-medium">Category</h3>
            <ul>
              {filters && filters.category && filters.category.slice(0, (filters.category.length > 10 && !filterCategoryShow ? 10 : filters.category.length)).map((item: any) => (
                <li key={item.category}>
                  <input type="checkbox" id={`category-${item.category}`} name="category" value={item.category} onChange={(e) => handleFilterChange(e)} /> 
                  <label htmlFor={`category-${item.category}`}> {item.category}</label>
                </li>
              ))}
                {filters?.category?.length > 10 && (
                  <button className="text-blue-500 hover:text-blue-700 transition duration-200 borderp-1 text-sm" onClick={() => setFilterCategoryShow(!filterCategoryShow)}> Show {filterCategoryShow ? "Less" : "More"}</button>
                )}
            </ul>
          </div>
        )}
        <div className='mb-4'>
          <h3 className="font-medium">Color</h3>
          <ColorPicker />
        </div>
        <div className='mb-4'>
          <h3 className="font-medium">Rating</h3>
          <ul>
            {Array.from({ length: 5 }, (_, index) => (
              <li key={index}>
                <input type="checkbox" checked={filter.rating === 5 - index} onChange={(e) => setFilter({ ...filter, rating: e.target.checked ? 5 - index : null })} /> {'⭐'.repeat(5 - index)}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="w-full grid grid-cols-4 gap-4 h-full">
        {filterData?.map((product: Product, idx:number) => (
          <div key={idx} className="bg-white p-4 rounded shadow flex flex-col justify-between h-full">
            <div>
              <div>
                <img src="https://placehold.co/200x200" alt="Product Image" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sm font-bold ">{product.id}</h3>
              <p className="text-gray-500">{product.brand}</p>
              <div className="flex items-center">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-blue-500 font-bold">₱{product.price}</p>
            </div>
            <div>
              <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddToCart(product.id)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </main>
    <AddToCartModal isOpen={isOpen} setIsOpen={setIsOpen} data={selectedData}/>
    </>
  );
};

export default Home;