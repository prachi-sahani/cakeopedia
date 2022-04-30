import { Route, Routes } from "react-router-dom";
import { Navbar, SideNav, ViewNotes } from "../components";
import { PageNotFound } from "./PageNotFound";
import "../stylesheets/notes.css";

export function Notes() {
  return (
    <div>
      <Navbar />
      <div className="page-content">
        <SideNav />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ViewNotes />}></Route>
            <Route path="*" exact={true} element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
