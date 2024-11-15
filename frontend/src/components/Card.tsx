type Props = {
  count: number
}
function Card({count}: Props) {
  return (
    <div key={count} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg" style={{ maxHeight: '22vh' }}>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Card Title</h5>
    <p className="mb-3 font-normal text-gray-700">This is a sample card description. You can add more details about the content of the card here.</p>
    <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
      Read more
      <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10 10.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    </a>
  </div>
  )
}
export default Card