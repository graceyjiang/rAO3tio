import { useNavigate } from "react-router-dom";
import "./Style.css";

function Search() {
  const goToResult = () => {
    useNavigate("/results");
  };

  return (
    <div class="container2">
      <h2>
        <div id="whattag">What tag are you looking for?</div>
      </h2>
      <form action="/results">
        <span id="tagbox">
          <input type="text" name="fname" id="tag" required />
        </span>
        <span>
          <input type="submit" id="next" value="Search" onClick={goToResult} />
        </span>
      </form>
    </div>
  );
}

export default Search;
