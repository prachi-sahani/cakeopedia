import { useState } from "react";

export function NotesHeader({ sortBy, setSortBy }) {
  const [showSortBy, setShowSortBy] = useState(false);

  return (
    <header className="header">
      <div
        className="sort-wrapper"
        onMouseEnter={() => setShowSortBy(true)}
        onMouseLeave={() => setShowSortBy(false)}
      >
        <div className="sort-by">
          Sort by date: {sortBy} first
          <i className="material-icons">arrow_drop_down</i>
        </div>
        {showSortBy && (
          <ul className="sort-list list-group-stacked">
            <li className="list-item" onClick={() => setSortBy("Latest")}>
              Latest first
            </li>
            <li className="list-item" onClick={() => setSortBy("Oldest")}>
              Oldest first
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
