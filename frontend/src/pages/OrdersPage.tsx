import { useEffect, useState } from "react";
import axiosAPI from "../utils/axios-api";
import CardTitle from "../components/CardTitle";
import OrdersTable from "../components/Tables/OrdersTable";
import TablePaginate from "../utils/tables/TablePaginate";
import CardSelector from "../components/CardSelector";
import PageContent from "../utils/pages/PageContent";
import { useGetAPI } from "../utils/hooks/useAPI-hooks";
import Swal from "sweetalert2";

type Order = {
  id: number,
  user: string,
  product_name:string,
  total_price: number,
  status: string,
  date_ordered: string,
}

const OrdersPage = () => {
<<<<<<< HEAD
  const [cardSelected, setCardSelected] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  const { data, isLoading } = useGetAPI('admin/orders', {
    onError: (error:any) => {
      console.error('Error fetching all items:', error.message);
      Swal.fire({
        text: error.message,
        icon: 'error'
      })
    },
  });

  const getOrders = async () => {
    try {
      const response = await axiosAPI.get("admin/orders");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const filteredOrders = (data ?? []).filter((order: Order) => {
    const isMatchingStatus = () => {
=======
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>();
  // const [total, setTotal] = useState(0);
  const [cardSelected, setCardSelected] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [search, setSearch] = useState<string>("");
  // const [searchType, setSearchType] = useState("user");
  // console.log(orders);
  const getOrders = () => {
    // axiosAPI.get(`admin/orders?perPage=${perPage}&page=${currentPage}&card=${cardSelected}&filterDate=${filterDate}`)
    axiosAPI.get(`admin/orders`)
    .then((response)=>{
      setOrders(response.data);
      // setTotal(response.data.total);
    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      setIsLoading(false);
    })
  }
  console.log(filterDate);
  const filteredOrders = orders?.filter((order:Order) => {
    const statusCondition = (() => {
>>>>>>> 3c8f3adf0d9f83a0d7514b082058b36c111d4f72
      switch (cardSelected) {
        case "all":
          return true;
        case "delivered":
          return ["delivered", "shipped"].includes(order.status);
        case "pending":
          return order.status === "pending";
        case "cancelled":
          return order.status === "cancelled";
        default:
          return false;
      }
    };
  
    const statusCondition = isMatchingStatus();
    const dateCondition = !filterDate || order.date_ordered === filterDate;
<<<<<<< HEAD
  
    return statusCondition && dateCondition;
=======

    const searchCondition = Object.values(order).some((value) => value.toString().toLowerCase().includes(search.toLowerCase()));

    return statusCondition && dateCondition && searchCondition;
>>>>>>> 3c8f3adf0d9f83a0d7514b082058b36c111d4f72
  });

  // console.log(filteredOrders);
  const handleCardSelected = (card:string) => { setCardSelected(card)}
  
  // useEffect(()=>{
  //   getOrders();
  // },[])

  return (
    <>
      <CardTitle 
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        title="Order"
        search ={search}
        setSearch ={setSearch}
        isSearchEnable={true}
      />
      <PageContent>
        <CardSelector 
          cardSelected={cardSelected}
          setCardSelected={handleCardSelected}
          cardTitle="Order"
        />
        <OrdersTable
          orders={filteredOrders}
          isLoading={isLoading}
          // refetch={getOrders}
        />
      </PageContent>
    </>
  )
}
export default OrdersPage