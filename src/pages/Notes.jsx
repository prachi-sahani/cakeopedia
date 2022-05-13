import { Route, Routes, useLocation } from "react-router-dom";
import {
  ErrorPage,
  Navbar,
  SideNav,
  ViewNotes,
  NotesHeader,
  AddNote,
} from "../components";
import { PageNotFound } from "./PageNotFound";
import "../stylesheets/notes.css";
import { useMessageHandling } from "../context/message-handling-context";
import { useState } from "react";
import { useDBdata } from "../context/db-data-context";

export function Notes() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const { showErrorPage } = useMessageHandling();
  const { notes } = useDBdata();
  const [sortBy, setSortBy] = useState("Latest");
  return (
    <div>
      <Navbar />
      {notes?.length > 0 && (
        <NotesHeader sortBy={sortBy} setSortBy={setSortBy} />
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
