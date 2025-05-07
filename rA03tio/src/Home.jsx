// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./Style.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const goToSearch = () => {
    useNavigate("/search");
  };

  return (
    <>
      <div class="container">
        <h1>
          <span id="frontpage1">rAO3tio</span>
        </h1>
        <h2>
          <span id="frontpage2">
            {" "}
            An advanced way to filter through works :){" "}
          </span>{" "}
        </h2>
        <a href="search">
          {" "}
          <button onClick={goToSearch}>Let's go!</button>{" "}
        </a>

        <button id="toggleDarkMode">Dark Mode</button>
      </div>
    </>
  );
}

export default Home;
