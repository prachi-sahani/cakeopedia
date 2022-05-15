import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDBdata } from "../context/db-data-context";
import "../stylesheets/view-notes.css";
import { Loader } from "./Loader";
import { Note } from "./Note";
import { ZeroNotesPage } from "./ZeroNotesPage";

export function ViewNotes({ sortBy }) {
  const { label } = useParams();
  const { getNotes, notes, notesLoading } = useDBdata();
  const [notesToDisplay, setNotesToDisplay] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!notes) {
      getNotes();
    }
  }, []);

  useEffect(() => {
    setNotesToDisplay([
      ...notesToDisplay.sort((a, b) => {
        return sortBy === "Latest"
          ? b.updatedOn - a.updatedOn
          : a.updatedOn - b.updatedOn;
      }),
    ]);
  }, [sortBy]);

  useEffect(() => {
    let filteredNotes = [];
    if (location.pathname.includes("archive")) {
      filteredNotes = notes?.filter(
        (element) => !element.trash && element.archive
      );
    } else if (location.pathname.includes("trash")) {
      filteredNotes = notes?.filter((element) => element.trash);
    } else if (location.pathname.includes("label")) {
      if (label) {
        filteredNotes = notes?.filter(
          (element) =>
            !element.trash && !element.archive && element.labels.includes(label)
        );
      }
    } else {
      filteredNotes = notes?.filter(
        (element) => !element.trash && !element.archive
      );
    }
    setNotesToDisplay(
      filteredNotes?.sort((a, b) => {
        return sortBy === "Latest"
          ? b.updatedOn - a.updatedOn
          : a.updatedOn - b.updatedOn;
      })
    );
  }, [notes, location]);

  return (
    <main className="view-notes mb-5">
      {notesLoading && <Loader />}
      <div className="notes grid-container grid-3 ">
        {notesToDisplay?.map((note, index) => (
          <Note note={note} key={index} />
        ))}
      </div>
      {notesToDisplay?.length === 0 && !notesLoading && <ZeroNotesPage />}
      {(location.pathname === "/notes" || label) && (
        <button
          onClick={() =>
            navigate(`${location.pathname}/note`, {
              state: { background: location },
            })
          }
          className="add-note btn-fab btn-primary material-icons"
        >
          add
        </button>
      )}
    </main>
  );
}
