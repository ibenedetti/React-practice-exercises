import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-[20dvw] bg-gray-200 z-[999]
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <button
        className="absolute top-4 right-4 font-bold text-red-500"
        onClick={() => setIsOpen(p => !p)}
      >
        X
      </button>

      <div className="p-4">
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
