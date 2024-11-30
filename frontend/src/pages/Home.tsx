import Card from "../components/Card"
import { useEffect, useState } from "react"
import axiosAPI from "../utils/axios-api"
const Home = () => {
  const [products, setProducts] = useState([]);
  
  const fetchData = async () => {
    await axiosAPI.get("/admin/products")
    .then((response) => {
      console.log(response.data)
      setProducts(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    fetchData()
  },[])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 justify-items-center mb-2">
        {products.map((product: any) => (
          <Card
            name={product.name} 
            price={product.price}
            discount={product.discount}
            image={product.image}
            isVisibleRating
          />
        ))}
      </div>
    </div>
  )
}
export default Home