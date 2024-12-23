import Card from "../components/Card"
import { useEffect, useState } from "react"
import axiosAPI from "../utils/axios-api"
import TablePagination from "../components/Form/TablePagination";

type product = {
  name: string;
  price: number;
  discount: number;
  image: string;
}
const Home = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');

  const fetchData = async () => {
    await axiosAPI.get(`/admin/products?perPage=${perPage}&page=${currentPage}&search=${searchValue}`)
    .then((response) => {
      console.log(response.data)
      setProducts(response.data.data)
      setLastPage(response.data.last_page)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    fetchData()
  },[perPage,currentPage,searchValue])
  const nextPage = () => {currentPage + 1}
  const previousPage = () => {currentPage - 1}
  const setPage = (page:number) => { setPerPage(page)}

  return (
    <div className="flex flex-col gap-2">
      <div>
        <input className="px-4 py-2 border border-gray-400 rounded-md focus:border-blue-500" type="text" name="search" id="search" placeholder="Search" onChange={(e) => setSearchValue(e.target.value)}/>
      </div>
      <div className="m-4  p-4 flex justify-center flex-col rounded-md">
        <div className="flex flex-row flex-wrap gap-3 justify-items-center mb-2 overflow-y-auto h-[calc(100vh-16rem)]">
          {products.map((product: product) => (
            <Card
              name={product.name} 
              price={product.price}
              discount={product.discount}
              image={product.image}
              isVisibleRating
            />
          ))}
        </div>
        <TablePagination 
          nextPage={nextPage} 
          previousPage={previousPage}
          setPerPage={(page) => setPage(page)}
          currentPage={currentPage} 
          perPage={perPage}
          lastPage={lastPage}/>
    </div>
    </div>
  )
}
export default Home