import { useEffect, useState } from "react";
import AO3Work from "./AO3Work.jsx";
import "./Style.css";
import DarkModeToggle from "./DarkModeToggle";
import { Link } from "react-router-dom";

function Result() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("http://127.0.0.1:4455/results")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="container">
      {typeof data.items === "undefined" ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <h1 id="works-heading">Works</h1>
          <ol>
            {data.items.map((work, index) => (
              <li key={index}>
                <AO3Work work={work} />
              </li>
            ))}
          </ol>
          <Link to="/search">
            <button className="back-to-search">Back to Search</button>
          </Link>
        </>
      )}
      <DarkModeToggle />
    </div>
  );
}

export default Result;
