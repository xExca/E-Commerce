import Card from "../../components/Card"


type Props = {}

const Dashboard = (props: Props) => {
  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 sm:p-10 lg:p-20 items-center gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
         <Card index={i} count={100000} />
        ))}
      </div>
    </>
  )
}

export default Dashboard

