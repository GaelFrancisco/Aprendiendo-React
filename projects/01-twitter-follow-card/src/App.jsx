import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {
    return (
        // with or without fragments
        // <React.Fragment>
        <section className="App">
            <TwitterFollowCard userName="midudev" name="Miguel Angel Duran" />
            <TwitterFollowCard userName="pheralb" name="Pablo Hernandez" />
            <TwitterFollowCard userName="MoureDev" name="Brais Moure" />
        </section>
    )
    
}