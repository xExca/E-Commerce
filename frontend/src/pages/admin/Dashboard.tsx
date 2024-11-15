import Card from "../../components/Card"

type Props = {}
const Dashboard = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-20">
        {Array.from({ length: 12 }).map((_, i) => (
         <Card key={i} />
        ))}
      </div>
    </>
  )
}
export default Dashboard