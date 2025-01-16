import CardSelector from "../components/CardSelector";
import CardTitle from "../components/CardTitle";
import ProductsTable from "../components/Tables/ProductsTable";
import PageContent from "../utils/pages/PageContent";
import { useGetAPI } from "../utils/hooks/useAPI-hooks"

type Props = {}
const ProductsPage = (props: Props) => {
  const {data, isLoading} = useGetAPI(`admin/products`, {
    onError: (error:any) => {
        console.error('Error fetching all items:', error.message);
      },
  });

  const filterData = (data ?? []).filter((item: any) => item.id >= 0);
  return (
    <> 
      <CardTitle 
      filterDate={""}
      setFilterDate={() => {}}
      title={"Products"} />
      <PageContent>
        <CardSelector 
        cardSelected={"all"}
        cardTitle={"Products"}
        setCardSelected={() => {}} />
        <ProductsTable
          data={filterData}
          isLoading={isLoading}
        />
      </PageContent>
    </>
  )
}
export default ProductsPage