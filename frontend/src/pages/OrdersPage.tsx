import { useEffect, useState } from "react";
import axiosAPI from "../utils/axios-api";
import CardTitle from "../components/CardTitle";
import OrdersTable from "../components/Tables/OrdersTable";
import TablePaginate from "../components/Tables/utils/TablePaginate";
import CardSelector from "../components/CardSelector";
import PageContent from "../components/utils/PageContent";

type Order = {
  id: number,
  user: string,
  product_name:string,
  total_price: number,
  status: string,
  date_ordered: string,
}

const OrdersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>();
  const [total, setTotal] = useState(0);
  const [cardSelected, setCardSelected] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  // console.log(orders);
  const getOrders = () => {
    // axiosAPI.get(`admin/orders?perPage=${perPage}&page=${currentPage}&card=${cardSelected}&filterDate=${filterDate}`)
    axiosAPI.get(`admin/orders`)
    .then((response)=>{
      setOrders(response.data);
      setTotal(response.data.total);
    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      setIsLoading(false);
    })
  }
  console.log(filterDate);
  const filteredOrders = orders?.filter((order:Order) => {
    const statusCondition = (() => {
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
    })();
    const dateCondition = !filterDate || order.date_ordered === filterDate;
    return statusCondition && dateCondition;
  });
  const handleCardSelected = (card:string) => { setCardSelected(card)}
  
  useEffect(()=>{
    getOrders();
  },[])

  return (
    <>
      <CardTitle 
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        title="Order"
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
          refetch={getOrders}
        />
      </PageContent>
    </>
  )
}
export default OrdersPage