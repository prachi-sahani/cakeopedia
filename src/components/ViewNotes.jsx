import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDBdata } from "../context/db-data-context";
import { useMessageHandling } from "../context/message-handling-context";
import "../stylesheets/view-notes.css";
import { Loader } from "./Loader";
import { v4 as uuid } from "uuid";

export function ViewNotes() {
  const { gridView } = useMessageHandling();
  const { getNotes, notes, notesLoading, updateNote } = useDBdata();
  const [notesToDisplay, setNotesToDisplay] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!notes) {
      getNotes();
    }
  }, []);

  useEffect(() => {
    setNotesToDisplay(
      notes?.filter((element) => !element.trash && !element.archive).reverse()
    );
  }, [notes]);

  function updateNoteStatus(note, type) {
    updateNote(
      notes.map((element) =>
        element.id === note.id ? { ...note, [type]: true } : element
      ),
      `Note sent to ${type}!`
    );
  }

  function duplicateNote(note) {
    updateNote([...notes, { ...note, id: uuid() }], "Duplicate note created!");
  }

  return (
    <main className="view-notes">
      {notesLoading && <Loader />}
      <div className="notes grid-container grid-3">
        {notesToDisplay?.map((note, index) => (
          <div
            key={index}
            className={`note grid-item card card-basic ${
              gridView ? "col-1" : "col-3"
            } col-sm-3`}
          >
            <div
              className="card-header"
              onClick={() =>
                navigate(`/notes/note/${note.id}`, {
                  state: { background: location, note },
                })
              }
            >
              <div className="card-title note-title py-1">{note.title}</div>
            </div>
            <div
              className="card-content note-content"
              onClick={() =>
                navigate(`/notes/note/${note.id}`, {
                  state: { background: location, note },
                })
              }
            >
              {note.description}
            </div>
            <div className="card-footer note-footer">
              <div className="action-icons">
                <button className="btn-icon material-icons-outlined">
                  color_lens
                </button>
                <button
                  className="btn-icon material-icons-outlined"
                  onClick={() => duplicateNote(note)}
                >
                  content_copy
                </button>
                <button
                  className="btn-icon material-icons-outlined"
                  onClick={() => updateNoteStatus(note, "archive")}
                >
                  archive
                </button>
                <button
                  className="btn-icon material-icons-outlined"
                  onClick={() => updateNoteStatus(note, "trash")}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {notesToDisplay?.length === 0 && (
        <div className="my-5 txt-center txt-gray">
          <Link
            to="/notes/note"
            className="link h1 txt-gray material-icons-outlined"
          >
            note_add
          </Link>
          <h1 className="heading h2">Start adding notes</h1>
        </div>
      )}
      <button
        onClick={() =>
          navigate("/notes/note", { state: { background: location } })
        }
        className="add-note btn-fab btn-primary material-icons"
      >
        add
      </button>
    </main>
  );
}
