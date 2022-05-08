import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDBdata } from "../context/db-data-context";
import "../stylesheets/add-note.css";
import { v4 as uuid } from "uuid";

export function AddNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    archive: false,
    createdOn: new Date(),
    trash: false,
    description: "",
    labels: [],
    title: "",
    updatedOn: new Date(),
  });
  const { updateNote, getNotes, notes, noteUpdateLoading } = useDBdata();
  useEffect(() => {
    // edit mode
    if (id) {
      if (notes) {
        const selectedNote = notes.find((element) => element.id === id);
        if (selectedNote) {
          setNote(selectedNote);
        } else {
          navigate("*");
        }
      }
    }
    if (!notes) {
      getNotes();
    }
  }, [notes]);

  function saveNote() {
    if (id) {
      updateNote(
        notes.map((element) => (element.id === id ? note : element)),
        "Note updated!"
      );
    } else {
      updateNote([...notes, { ...note, id: uuid() }], "New note added!");
    }
  }

  function updateNoteStatus(selectedNote, type) {
    updateNote(
      notes.map((element) =>
        element.id === selectedNote.id
          ? { ...selectedNote, [type]: true }
          : element
      ),
      `Note sent to ${type}!`
    );
  }

  function duplicateNote(selectedNote) {
    updateNote(
      [...notes, { ...selectedNote, id: uuid() }],
      "Duplicate note created!"
    );
  }

  return (
    <main>
      <div className="add-note-modal dialog-window">
        <div className="dialog-box add-note-box">
          <div className="dialog-header txt txt-bold txt-md">
            <input
              type="text"
              name="title"
              id="title"
              className="add-note-title"
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
              className="add-note-content"
              placeholder="Take a note..."
              value={note.description}
              onChange={(e) =>
                setNote({ ...note, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="dialog-footer add-note-footer">
            <div className="note-action-icons">
              <button className="btn-icon material-icons-outlined">
                color_lens
              </button>
              {/* <button className="btn-icon material-icons-outlined">
                image
              </button>
              <button className="btn-icon material-icons-outlined">
                check_box
              </button> */}
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
            <div className="note-action-buttons">
              <button
                className="btn-link btn-link-primary txt-bold p-2"
                disabled={noteUpdateLoading}
                onClick={saveNote}
              >
                {noteUpdateLoading ? "Saving..." : "Save"}
              </button>
              <Link
                disabled={noteUpdateLoading}
                to="/notes"
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
