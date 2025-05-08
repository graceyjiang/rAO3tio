import { useEffect, useState } from "react";

async function Result() {
  const loadData = await fetch("http://127.0.0.1:4455/results");
  const works = await loadData.json();
  return (
    <>
      <h1>Works</h1>
      <ol>
        {works.items.map((work, index) => (
          <li key={index}>{work}</li>
        ))}
      </ol>
    </>
  );
}

export default Result;
