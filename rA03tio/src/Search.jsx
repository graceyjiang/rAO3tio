import { useNavigate } from "react-router-dom";
import "./Style.css";
import DarkModeToggle from "./DarkModeToggle";

function Search() {
  // const goToResult = () => {
  //   useNavigate("/results");
  // };
  const navigate = useNavigate();

  const goToResult = (e) => {
    e.preventDefault(); // Prevent default form submission (requires input?)
    const query = document.getElementById("tag").value;
    if (query) {
      navigate(`/results?query=${encodeURIComponent(query)}`);
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
          <input type="text" name="fname" id="tag" required />
        </span>
        <span>
          <input type="submit" id="next" value="Search" />
        </span>
      </form>
      <DarkModeToggle />
    </div>
  );
}

export default Search;
