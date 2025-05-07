import { useNavigate } from "react-router-dom";
import "./Style.css";

function Search() {
  return (
    <div class="container2">
      <h2>
        <span id="whattag">What tag are you looking for?</span>
      </h2>
      <form action="/results">
        <span id="tagbox">
          <input type="text" name="fname" id="tag" required />
        </span>
        <span>
          <input type="submit" id="next" value="Next" />
        </span>
      </form>
    </div>
  );
}

export default Search;
