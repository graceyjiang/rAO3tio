import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Style.css";
import DarkModeToggle from "./DarkModeToggle";

function Search() {
  // const goToResult = () => {
  //   useNavigate("/results");
  // };
  const navigate = useNavigate();

  const [completed, setCompleted] = useState(null);

  const goToResult = (e) => {
    e.preventDefault(); // Prevent default form submission and reloading the page (essential in single-page apps)
    const query = document.getElementById("tag").value;
    if (query) {
      navigate(
        `/results?query=${encodeURIComponent(
          query
        )}&completion=${encodeURIComponent(completed)}`
      );
    }
  };

  return (
    <div className="container2">
      <h2>
        <div id="whattag">What tag are you looking for?</div>
      </h2>
      {/* <form action="/results"> */}
      <form onSubmit={goToResult}>
        <span id="tagbox">
          <input type="text" id="tag" required />
        </span>
        <span>
          <input type="submit" id="next" value="Search" />
        </span>
        <div className="completion-status-container">
          <label className="completion-option">
            <input
              type="radio"
              name="completion-status"
              id="all_works"
              onChange={() => setCompleted("none")}
              defaultChecked
            />
            All Works
          </label>

          <label className="completion-option">
            <input
              type="radio"
              name="completion-status"
              id="complete_only"
              onChange={() => setCompleted("true")}
            />
            Complete Works Only
          </label>

          <label className="completion-option">
            <input
              type="radio"
              name="completion-status"
              id="wip_only"
              onChange={() => setCompleted("false")}
            />
            Works In Progress Only
          </label>
        </div>
      </form>
      <DarkModeToggle />
    </div>
  );
}

export default Search;
