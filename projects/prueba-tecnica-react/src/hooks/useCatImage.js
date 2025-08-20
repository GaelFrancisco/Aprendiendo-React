import { useEffect, useState } from "react"

export function useCatImage ( { fact } ) {
  const [imageUrl, setImageUrl] = useState()
  
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

  return { imageUrl }
} // imageurl
