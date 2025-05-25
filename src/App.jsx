import React, { useState, useEffect } from "react";

import "./App.css";
import { Home } from "./Components/Home/Home";
import { About } from "./Components/About/About";
import { Prize } from "./Components/Prize/Prize";
import { Schedule } from "./Components/Schedule/Schedule";
import { Venue } from "./Components/Venue/Venue";
import { Faq } from "./Components/FAQ/Faq";
import { Sponsors } from "./Components/Sponsors/Sponsors";
import { Footer } from "./Components/Footer/Footer";
// import { Judge } from './Components/Judge/Judge'
import { Team } from "./Components/Team/Team";
import { Navbar } from "./Components/Navbar/Navbar";
import FriskyFont from "./fonts/Frisky.ttf";
import MinecraftFont from "./fonts/Minecraftchmc.ttf";

import { Loading } from "./Components/Loading/loading";

function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load the Frisky font
    const friskyFont = new FontFace("Frisky", `url(${FriskyFont})`);
    const minecraftFont = new FontFace("Minecraft", `url(${MinecraftFont})`);

    Promise.all([friskyFont.load(), minecraftFont.load()])
      .then((fonts) => {
        fonts.forEach((font) => document.fonts.add(font));
        setIsFontLoaded(true);
      })
      .catch((error) => {
        console.error("Font loading failed:", error);
      });

    // Fetch the data from data.json
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({ navbar: [] });
      }
    };

    fetchData();
  }, []);

  if (!isFontLoaded || !data) {
    return <Loading />;
  }

  return (
    <>
      <Navbar items={data.navbar} />
      <Home heroData={data.hero} />
      <About
        description={data.hero.description}
        buttonText={data.hero.buttonText}
      />

      <Prize />
      <Schedule />
      <Venue />
      <Sponsors />
      <Faq />
      {/* <Judge/> */}
      <Team />
      <Footer />
    </>
  );
}

export default App;
