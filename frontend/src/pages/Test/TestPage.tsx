const TestPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen border">
      <div className="grid grid-cols-6 gap-1 border">
        {Array.from({ length: 36 }, (_, i) => (
          <div key={i} className="border h-20 w-20 flex justify-center items-center">
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
export default TestPage