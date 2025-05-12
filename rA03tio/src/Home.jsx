// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./Style.css";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Home() {
  const navigate = useNavigate();
  const goToSearch = () => {
    navigate("/search");
  };

  return (
    <>
      <div className="container">
        <h1>
          <span id="frontpage1">rAO3tio</span>
        </h1>
        <h2>
          <span id="frontpage2">
            {" "}
            An advanced way to filter through works :){" "}
          </span>{" "}
        </h2>
        <button onClick={goToSearch}>Let's go!</button>
        <DarkModeToggle />
      </div>
    </>
  );
}

export default Home;
