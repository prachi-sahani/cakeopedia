import { Route, Routes, useLocation } from "react-router-dom";
import { ErrorPage, Navbar, SideNav, ViewNotes } from "../components";
import { PageNotFound } from "./PageNotFound";
import "../stylesheets/notes.css";
import { AddNote } from "../components/AddNote";
import { useMessageHandling } from "../context/message-handling-context";

export function Notes() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const { showErrorPage } = useMessageHandling();

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <SideNav />
        <main className="main-content">
          {showErrorPage && <ErrorPage />}
          <Routes location={background || location}>
            <Route path="/" element={<ViewNotes />}></Route>
            <Route path="/note" element={<AddNote />}></Route>
            <Route path="/note/:id" element={<AddNote />}></Route>
            <Route path="*" exact={true} element={<PageNotFound />} />
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
