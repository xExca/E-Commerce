import { useState } from "react"
import CardSelector from "../components/CardSelector"
import CardTitle from "../components/CardTitle"
import PageContent from "../components/utils/PageContent"

type Props = {}
const SettingsPage = (props: Props) => {
  const [cardSelected, setCardSelected] = useState("all");
  return (
   <>
    <CardTitle 
      title="Settings"
    />
    <PageContent>
      <CardSelector 
        cardTitle="Settings"
        cardSelected={cardSelected}
        setCardSelected={setCardSelected}
        />
    </PageContent>
    </>
  )
}
export default SettingsPage