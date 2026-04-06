import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        top: "5dvh",
        left: "5dvw"
      }}
    >
      <button
        className="absolute top-4 right-4 font-bold text-red-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        X
      </button>

      <div className="p-4" 
      style={{
        height: isOpen ? "15dvh" : "0dvh",
        transition: "height 0.2s ease-in-out",
        overflow: isOpen ? "auto" : "hidden"
      }}>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
