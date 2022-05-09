import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDBdata } from "../context/db-data-context";
import "../stylesheets/add-note.css";
import { v4 as uuid } from "uuid";
import { bgColorPalette } from "../utilities/bg-color-palette";

export function AddNote() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [showColorPalette, setShowColorPalette] = useState(false);
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
        "Note updated!",
        true
      );
    } else {
      updateNote([...notes, { ...note, id: uuid() }], "New note added!", true);
    }
  }

  function updateNoteStatus(selectedNote, type) {
    updateNote(
      notes.map((element) =>
        element.id === selectedNote.id
          ? { ...selectedNote, [type]: true }
          : element
      ),
      `Note sent to ${type}!`,
      true
    );
  }

  function duplicateNote(selectedNote) {
    updateNote(
      [...notes, { ...selectedNote, id: uuid() }],
      "Duplicate note created!",
      true
    );
  }

  function changeNoteBgColor(selectedNote, color) {
    if (id) {
      updateNote(
        notes.map((element) =>
          element.id === selectedNote.id
            ? { ...selectedNote, bgColor: color }
            : element
        ),
        "Note background changed!",
        false
      );
    } else {
      setNote((value) => ({ ...value, bgColor: color }));
    }
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
            <div className="note-action-icons">
              <button
                className="btn-icon material-icons-outlined"
                onClick={() => setShowColorPalette((value) => !value)}
              >
                color_lens
              </button>
              {showColorPalette && (
                <div className="bg-color-palette">
                  <ul className="bg-color-list">
                    {bgColorPalette.map((item) => (
                      <li
                        key={item.id}
                        className={`avatar avatar-icon avatar-xs bg-${item.bgColor}`}
                        onClick={() => changeNoteBgColor(note, item.bgColor)}
                      >
                        {item.bgColor === note.bgColor && (
                          <i className="material-icons">check</i>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* <button className="btn-icon material-icons-outlined">
                image
              </button>
              <button className="btn-icon material-icons-outlined">
                check_box
              </button> */}
              <button
                className="btn-icon material-icons-outlined"
                disabled={!id}
                onClick={() => duplicateNote(note)}
              >
                content_copy
              </button>
              <button
                className="btn-icon material-icons-outlined"
                disabled={!id}
                onClick={() => updateNoteStatus(note, "archive")}
              >
                archive
              </button>
              <button
                className="btn-icon material-icons-outlined"
                disabled={!id}
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
