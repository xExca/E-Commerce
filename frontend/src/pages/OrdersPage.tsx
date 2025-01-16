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
  
    return statusCondition && dateCondition;
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