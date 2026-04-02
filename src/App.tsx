import './App.css'
import { useState } from 'react'
import { useRenderObserver } from './inspectors/useRenderObserver'
import Sidebar from './components/Sidebar'

function App() {

  const [ count, setCount ] = useState(0);
  const [ random, setRandom ] = useState(0);
  const { cause, squareRef, density, renderCount } = useRenderObserver('App', { count, random });

  return (
    <>
      <Sidebar />
      <h1>YUCA</h1>
      <button onClick={() => setCount (count + 1)}>{count}</button>
      <button onClick={() => setRandom (Math.random())}>{random}</button>
      

      <div 
        ref={squareRef}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          height: '100px',
          width: '100px',
          background: 'black',
          transition: 'scale 0.2s',
          border: '5px solid red',
          zIndex: 9999,
          color: density >= 5 ? 'red' : 'green'
        }} 
      >
        {density} <br /> {renderCount} <br /> {cause}
      </div>

    </>
  )
}

export default App
