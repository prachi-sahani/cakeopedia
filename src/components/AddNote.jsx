import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDBdata } from "../context/db-data-context";
import "../stylesheets/add-note.css";
import { v4 as uuid } from "uuid";

import { useMessageHandling } from "../context/message-handling-context";
import { NoteFooterIcons } from "./NoteFooterIcons";

export function AddNote() {
  const { id, label } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [note, setNote] = useState({
    archive: false,
    bgColor: "white",
    createdOn: new Date(),
    trash: false,
    description: "",
    labels: [],
    title: "",
    updatedOn: new Date(),
  });

  const { updateNote, getNotes, notes, noteUpdateLoading } = useDBdata();
  const { showSnackbar } = useMessageHandling();
  useEffect(() => {
    // edit mode
    if (id) {
      if (notes) {
        const selectedNote = notes.find((element) => element.id === id);
        if (selectedNote) {
          setNote(selectedNote);
        } else {
          navigate("*");
          showSnackbar("Invalid note id!");
        }
      }
    } else {
      // new note
      // while adding note from label page, that particular label will be added to the new note
      if (label) {
        setNote((value) => ({ ...value, labels: [label] }));
      }
    }
    if (!notes) {
      getNotes();
    }
  }, [notes]);

  function saveNote() {
    // edit mode
    if (id) {
      updateNote(
        notes.map((element) =>
          element.id === id ? { ...note, updatedOn: new Date() } : element
        ),
        "Note updated!",
        true
      );
    } else {
      // add new note
      updateNote([...notes, { ...note, id: uuid() }], "New note added!", true);
    }
  }

  function removeLabel(selectedLabel) {
    setNote((value) => ({
      ...value,
      labels: value.labels.filter((item) => item !== selectedLabel),
    }));
  }

  return (
    <main>
      <div className="add-note-modal dialog-window">
        <div className={`dialog-box add-note-box bg-${note.bgColor}`}>
          <div className="dialog-header txt txt-bold txt-md">
            <input
              type="text"
              name="title"
              id="title"
              className={`add-note-title txt-bold bg-${note.bgColor}`}
              placeholder="Title"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>
          <div className="dialog-body">
            <textarea
              name="description"
              id="description"
              rows="15"
              className={`bg-${note.bgColor} add-note-content`}
              placeholder="Take a note..."
              value={note.description}
              onChange={(e) =>
                setNote({ ...note, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="dialog-footer add-note-footer">
            <div className="label-tags pt-2">
              {note.labels.map((item, i) => (
                <div key={i} className="label-tag-item">
                  {item}
                  <button
                    className="btn-link btn-sm material-icons"
                    onClick={() => removeLabel(item)}
                  >
                    close
                  </button>
                </div>
              ))}
            </div>
            <NoteFooterIcons note={note} setNote={setNote} id={id} />

            <div className="note-action-buttons">
              {!location.pathname.includes("trash") && (
                <button
                  className="btn-link btn-link-primary txt-bold p-2"
                  disabled={noteUpdateLoading}
                  onClick={saveNote}
                >
                  {noteUpdateLoading ? "Saving..." : "Save"}
                </button>
              )}
              <Link
                disabled={noteUpdateLoading}
                to={location?.state?.background?.pathname ?? "/notes"}
                className="link btn-link btn-close txt-bold p-2"
              >
                Close
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
