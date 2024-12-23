import { useState } from "react"
import CardTitle from "../components/CardTitle"
import UserTable from "../components/Tables/UserTable"
import TablePaginate from "../components/Tables/utils/TablePaginate"

type Props = {}
const CustomerPage = (props: Props) => {
  const [filterDate,setFilterDate] = useState('')
  const handleFilterDate = (e:any) => {setFilterDate(e.target.value)}
  return (
    <>
      <CardTitle 
      filterDate={filterDate}
      setFilterDate={handleFilterDate}
      title={"Customers"} />
      <UserTable />
      <TablePaginate 
      perPage={10}
      setPerPage={() => {}}
      currentPage={1}
      setCurrentPage={() => {}}
      lastPage={1}
      from={1}
      to={1}
      total={1}
      />
    </>
  )
}
export default CustomerPage