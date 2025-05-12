// import "./Style.css";

function AO3Work({ work }) {
  console.log(work);
  const title = work.title;
  const work_id = work.id;
  console.log(work_id);
  const work_url = "https://archiveofourown.org/works/" + work_id;

  return (
    <div className="result-card">
      <h2>
        <a href={work_url} className="work-title">
          {title}
        </a>
      </h2>
      <p className="card-text">Author: {work.author}</p>
      <div className="stat-container">
        <div className="card-text">Ratio: {work.ratio}</div>
        <div className="card-text">Bookmarks: {work.bookmarks}</div>
        <div className="card-text">Kudos: {work.kudos}</div>
        <div className="card-text">Hits: {work.hits}</div>
      </div>
    </div>
  );
}

export default AO3Work;
