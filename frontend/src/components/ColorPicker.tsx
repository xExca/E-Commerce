type Props = {
  selectedColor: string | null
  handleColorClick: (color: string) => void
  listColors?: Colors[]
}
type Colors ={
  color: string
  id: number
}

const ColorPicker = ({ selectedColor, handleColorClick, listColors }: Props) => {
  const colors = listColors || [];

    return (
      <div className="flex space-x-2">
        {colors.map(({ color }) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full ${
              selectedColor === color
                ? 'border-2 border-blue-500' // Add circle border for selected color
                : 'border border-gray-200'
            }`}
            style={{ backgroundColor: color }} // Set background color
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>
    );
}
export default ColorPicker
