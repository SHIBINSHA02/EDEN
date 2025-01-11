import { useState } from 'react'

import './App.css'
import { Home } from './Components/Home/Home'
import { About } from './Components/About/About'
import { Prize } from './Components/Prize/Prize'
import { Schedule } from './Components/Schedule/Schedule'
import { Venue } from './Components/Venue/Venue'
import { Faq } from './Components/FAQ/Faq'
import { Sponsors } from './Components/Sponsors/Sponsors'
import { Footer } from './Components/Footer/Footer'
import { Judge } from './Components/Judge/Judge'
import { Team } from './Components/Team/Team'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      <About/>
      <Prize/>
      <Schedule/>
      <Venue/>
      <Sponsors/>
      <Faq/>
      <Judge/>
      <Team/>
      <Footer/>

    </>
  )
}

export default App
