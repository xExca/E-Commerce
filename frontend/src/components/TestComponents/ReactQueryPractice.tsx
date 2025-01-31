import { useState } from "react";



const ReactQueryPractice = () => {
  const colors = [ 
    {
        "id": 1,
        "name": "LightSlateGray",
        "created_at": "2025-01-28T07:18:32.000000Z",
        "updated_at": "2025-01-28T07:18:32.000000Z",
        "pivot": {
            "product_id": 5,
            "color_id": 1
        },
        "sizes": [
            {
                "id": 1,
                "name": "4096",
                "quantity": 5,
                "created_at": "2025-01-28T07:18:32.000000Z",
                "updated_at": "2025-01-28T07:18:32.000000Z",
                "pivot": {
                    "color_id": 1,
                    "size_id": 1
                }
            },
            {
                "id": 2,
                "name": "2048",
                "quantity": 84,
                "created_at": "2025-01-28T07:18:32.000000Z",
                "updated_at": "2025-01-28T07:18:32.000000Z",
                "pivot": {
                    "color_id": 1,
                    "size_id": 2
                }
            }
        ]
    },
    {
        "id": 8,
        "name": "DarkKhaki",
        "created_at": "2025-01-28T07:18:32.000000Z",
        "updated_at": "2025-01-28T07:18:32.000000Z",
        "pivot": {
            "product_id": 5,
            "color_id": 8
        },
        "sizes": [
            {
                "id": 15,
                "name": "2048",
                "quantity": 24,
                "created_at": "2025-01-28T07:18:32.000000Z",
                "updated_at": "2025-01-28T07:18:32.000000Z",
                "pivot": {
                    "color_id": 8,
                    "size_id": 15
                }
            },
            {
                "id": 16,
                "name": "1024",
                "quantity": 24,
                "created_at": "2025-01-28T07:18:32.000000Z",
                "updated_at": "2025-01-28T07:18:32.000000Z",
                "pivot": {
                    "color_id": 8,
                    "size_id": 16
                }
            }
        ]
    }
  ];

  const [selectedColor, setSelectedColor] = useState<string | null>('LightSlateGray');

  // Extract unique sizes
  const uniqueSizes = Array.from(
    new Map(
      colors
        .flatMap(color => color.sizes)
        .map(size => [size.name, size]) // Use size name as the key for uniqueness
    ).values()
  );

  return (
    <div>
      {/* Render color selection */}
      <div>
        <h3>Select Color:</h3>
        {colors.map(color => (
          <button
            key={color.id}
            style={{
              margin: '5px',
              backgroundColor: selectedColor === color.name ? 'lightblue' : 'white'
            }}
            onClick={() => setSelectedColor(color.name)}
          >
            {color.name}
          </button>
        ))}
      </div>

      {/* Render sizes */}
      <div>
        <h3>Sizes:</h3>
        {uniqueSizes.map(size => (
          <div
            key={size.id}
            className={`m-1 p-2 border border-black ${colors.find(color => color.name === selectedColor)?.sizes.some(s => s.name === size.name) ? 'bg-green-100' : 'bg-white'}`}
          >
            {size.name}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ReactQueryPractice