import { Route, Routes, useLocation } from "react-router-dom";
import { ErrorPage, Navbar, SideNav, ViewNotes } from "../components";
import { PageNotFound } from "./PageNotFound";
import "../stylesheets/notes.css";
import { AddNote } from "../components/AddNote";
import { useMessageHandling } from "../context/message-handling-context";
import { useState } from "react";
import { useDBdata } from "../context/db-data-context";

export function Notes() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const { showErrorPage } = useMessageHandling();
  const { notes } = useDBdata();
  const [showSortBy, setShowSortBy] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  return (
    <div>
      <Navbar />
      {notes?.length > 0 && (
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
      )}
      <div className="page-content">
        <SideNav />
        <main className="main-content">
          {showErrorPage && <ErrorPage />}
          <Routes location={background || location}>
            <Route path="/" element={<ViewNotes sortBy={sortBy} />}></Route>
            <Route
              path="/label/:label"
              element={<ViewNotes sortBy={sortBy} />}
            ></Route>
            <Route path="/note" element={<AddNote />}></Route>
            <Route path="/note/:id" element={<AddNote />}></Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {background && (
            <Routes>
              <Route path="/note/:id" element={<AddNote />}></Route>
              <Route path="/note" element={<AddNote />}></Route>
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
}
