import axiosAPI from "../../utils/axios-api"
import { useState } from "react"
type Payload = {
  name: string |null
}
const TestingForm = () => {
  const [payload, setPayload] = useState<Payload>({
    name: ''
  })
  // axiosAPI.post('/truds', payload)
  const handleSumit = (e:any) => {
    e.preventDefault()

    axiosAPI.post('/truds', payload)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    }).finally(() => {
      setPayload({
        name: ''
      })
    })
  }
  
  return (
    <form>
      <input type="text" name="name" id="name" onChange={(e) => {setPayload({name: e.target.value}); console.log(payload)}} className="w-full border border-gray-400" placeholder="Name"/>
      <button type="submit" onClick={handleSumit}>Submit</button>
    </form>
  )
}
export default TestingForm