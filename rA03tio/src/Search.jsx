import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Style.css";
import DarkModeToggle from "./DarkModeToggle";

function Search() {
  // const goToResult = () => {
  //   useNavigate("/results");
  // };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    completionStatus: null,
    textInput: "",
  });

  // const [completed, setCompleted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target; // event object
    setFormData((prev) => ({ ...prev, [name]: value })); // sets the formdata from above
  };

  const goToResult = async (e) => {
    e.preventDefault(); // Prevent default form submission and reloading the page (essential in single-page apps)
    // const query = document.getElementById("tag").value;
    // if (query) {
    //   navigate(
    //     `/results?query=${encodeURIComponent(
    //       query
    //     )}&completion=${encodeURIComponent(completed)}`
    //   );
    // }
    try {
      console.log(formData);
      const response = await fetch("http://127.0.0.1:4455/results", {
        // send body as a post request to flask backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const jsonReponse = await response.json();
      console.log(jsonReponse);
      localStorage.setItem("data", jsonReponse); // store response from backend in local storage so we can retrieve it for results page
      navigate("/results");
    } catch (error) {
      console.error("Fetch failed: ", error);
    }
  };

  return (
    <div className="container2">
      <h2>
        <div id="whattag">What tag are you looking for?</div>
      </h2>
      <form onSubmit={goToResult}>
        <span id="tagbox">
          <input
            type="text"
            id="tag"
            name="textInput"
            value={formData.textInput}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <input type="submit" id="next" value="Search" />
        </span>
        <div className="completion-status-container">
          <label className="completion-option">
            <input
              type="radio"
              id="all_works"
              name="completionStatus"
              value="none"
              onChange={handleChange}
              defaultChecked
            />
            All Works
          </label>

          <label className="completion-option">
            <input
              type="radio"
              id="complete_only"
              name="completionStatus"
              value="true"
              onChange={handleChange}
            />
            Complete Works Only
          </label>

          <label className="completion-option">
            <input
              type="radio"
              id="wip_only"
              name="completionStatus"
              value="false"
              onChange={handleChange}
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
