import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${threeFirstWords}$?fontSize=50&fontColor=red&json=true`

export function App() {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()
    const getRandomFact = () => {
      fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => res.json())
        .then(data => {
          const { fact } = data 
          setFact(fact)
        })
    }
    // Cargar un hecho aleatorio al iniciar la app
    useEffect(getRandomFact, [])
    // Cargar una imagen de gato al cambiar el hecho
    useEffect(() => {
      if (!fact) return

      const threeFirstWords = fact.split(' ', 3).join(' ')
      console.log(threeFirstWords)

      fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
        .then(res => res.json())
        .then(response => {
          const { url } = response
          setImageUrl(url)
        })
    }, [fact])

  const handleClick = () => {
    getRandomFact()
  }

  return (
    <main>
        <h1>App de gatitos 🐱</h1>
      
      <button onClick={handleClick}>Get new fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
      </section>
    </main>
  )
}