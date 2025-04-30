import { useState, useEffect } from 'react'

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
import { Navbar } from './Components/Navbar/Navbar'

function App() {
  
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar items={data.navbar} />
      <Home heroData={data.hero} /> {/* Pass hero data to Home */}
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