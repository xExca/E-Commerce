type Props = {
<<<<<<< Updated upstream
  image: string;
  name: string;
  price: number;
  discount?: number;
  isVisibleRating?: boolean;
  rating?: number;
}
function Card({ image, name ,price, discount, isVisibleRating = false, rating}: Props) {
  return (
    <div className="w-[12rem] h-fit hover:shadow-2xl border border-zinc-200 rounded-none bg-zinc-50">
      <img src={image} alt="alt" className="h-[12rem] object-cover"/>
      <div className="flex flex-col gap-1">
        <div className="text-nowarap h-[4rem]">
          <div>
            {name.length > 50 ? name?.slice(0, 50) + '...' : name} 
          </div>
        </div>

        {isVisibleRating ? (
          <>
          <div className="flex flex-row gap-1">
          <span className="text-orange-600 text-lg text-semibold">₱{discount !== undefined ? (price - (price * discount / 100)).toFixed(2) : price}</span>
          </div>
          <div className="flex flex-row gap-1">
            <span className="line-through text-gray-400">{price}</span>
            {discount &&
              <span>{discount}%</span>
            }
          </div>
          </>
        ):(
          <div className="flex flex-row gap-1">
            <span className="text-orange-600">₱{discount ? (price - (price * discount / 100)): price}</span>
            {discount &&
              <span>{discount}%</span>
            }  
          </div>
        )

        }
        <div className="flex">
          {!isVisibleRating &&
            <div>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
            </div>
          }
         
        </div>
      </div>
    </div>
=======
  count: number
  text: string
  link: string
}
function Card({count,text,link}: Props) {
  return (
    <a href={link}>
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-left">
        <div className="flex justify-start items-center mb-4">
          <div className="text-green-700 text-5xl">
            <IoDocument />
          </div>
        </div>
        <div className="text-green-700 text-4xl font-bold mb-2">{count}</div>
        <div className="text-gray-700 font-medium text-2xl">{text}</div>
      </div>
    </a>
>>>>>>> Stashed changes
  )
}
export default Card