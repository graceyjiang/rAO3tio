import { useEffect, useState } from "react";
import AO3Works from "./AO3Work.jsx";
import "./Style.css";

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
    <div>
      {typeof data.items === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Works</h1>
          {/* <ol>
            {data.items.map((work, index) => (
              <li key={index}>{work}</li>
            ))}
          </ol> */}
          <ol>
            {data.items.map((work, index) => (
              <li key={index}>
                <AO3Works work={work} />
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default Result;
