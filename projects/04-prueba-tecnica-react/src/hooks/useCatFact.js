import { useState, useEffect } from "react"
import { getRandomFact } from "../services/facts.js"

export function useCatFact() {
  const [fact, setFact] = useState()

  const refreshRandomFact =() => {
    getRandomFact().then(newFact => setFact(newFact))
  }

    // Cargar un hecho aleatorio al iniciar la app
  useEffect(refreshRandomFact, [])

  return { fact, refreshRandomFact }
}