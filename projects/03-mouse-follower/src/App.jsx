import { useEffect, useState } from "react"

  const FollowMouse = () => {
    const [enabled, setEnabled] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    // pointer move event listener
    useEffect(() => {
    console.log('effect', [ enabled ])

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', { clientX, clientY })
      setPosition({ x: clientX, y: clientY})
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // Cleanup function to remove the event listener
    // when the component unmounts or when `enabled` changes
    // to prevent memory leaks and unnecessary event listeners
    return () => {
      console.log('cleanup')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

    // change body classname
    useEffect(() => {
      document.body.classList.toggle('no-cursor', enabled)
      return () => {
        document.body.classList.remove('no-cursor')
      }
    }, [enabled])

    return (
    <>
      <div 
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <h3>Proyecto 3</h3>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
  }

function App() {
  
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
