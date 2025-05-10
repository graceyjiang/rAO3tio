function AO3Work({ work }) {
  return (
    <>
      <h2>{work.title}</h2>
      <p>{work.author}</p>
      <div className="stat-container">
        <div>Ratio: {work.ratio}</div>
        <div>Bookmarks: {work.bookmarks}</div>
        <div>Kudos: {work.kudos}</div>
        <div>Hits: {work.hits}</div>
      </div>
    </>
  );
}

export default AO3Work;
