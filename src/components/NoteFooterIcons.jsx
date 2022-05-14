import { useState } from "react";
import { useDBdata } from "../context/db-data-context";
import { bgColorPalette } from "../utilities/bg-color-palette";
import { LabelsDialog } from "./LabelsDialog";
import { v4 as uuid } from "uuid";
import { useLocation } from "react-router-dom";

export function NoteFooterIcons({ note, setNote, id }) {
  const location = useLocation();
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [showLabelsDialog, setShowLabelsDialog] = useState(false);
  const { updateNote, notes } = useDBdata();

  function updateNoteStatus(selectedNote, type, msg) {
    updateNote(
      notes.map((element) =>
        element.id === selectedNote.id
          ? {
              ...selectedNote,
              [type]: !selectedNote[type],
              updatedOn: new Date(),
            }
          : element
      ),
      `Note ${msg} ${type}!`,
      true
    );
  }

  function duplicateNote(selectedNote) {
    updateNote(
      [
        ...notes,
        {
          ...selectedNote,
          id: uuid(),
          updatedOn: new Date(),
          createdOn: new Date(),
        },
      ],
      "Duplicate note created!",
      true
    );
  }

  function deleteNote(selectedNote) {
    updateNote(
      notes.filter((item) => selectedNote.id !== item.id),
      "Note permanently deleted!",
      true
    );
  }

  function changeNoteBgColor(color) {
    setNote((value) => ({ ...value, bgColor: color }));
  }
  return location.pathname.includes("notes/trash") ? (
    <div className="note-action-icons">
      <button
        className="btn-icon material-icons-outlined"
        onClick={() => updateNoteStatus(note, "trash", "restored from")}
      >
        restore_from_trash
      </button>
      <button
        className="btn-icon material-icons-outlined"
        onClick={() => deleteNote(note)}
      >
        delete_forever
      </button>
    </div>
  ) : (
    <div className="note-action-icons">
      <button
        className="btn-icon material-icons-outlined"
        onClick={() => setShowLabelsDialog((value) => !value)}
      >
        new_label
      </button>
      {showLabelsDialog && (
        <LabelsDialog note={note} editMode={true} setNote={setNote} />
      )}
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
                onClick={() => changeNoteBgColor(item.bgColor)}
              >
                {item.bgColor === note.bgColor && (
                  <i className="material-icons">check</i>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="btn-icon material-icons-outlined"
        disabled={!id}
        onClick={() => duplicateNote(note)}
      >
        content_copy
      </button>
      {note.archive && (
        <button
          className="btn-icon material-icons-outlined"
          disabled={!id}
          onClick={() => updateNoteStatus(note, "archive", "restored from")}
        >
          unarchive
        </button>
      )}
      {!note.archive && (
        <button
          className="btn-icon material-icons-outlined"
          disabled={!id}
          onClick={() => updateNoteStatus(note, "archive", "sent to")}
        >
          archive
        </button>
      )}
      <button
        className="btn-icon material-icons-outlined"
        disabled={!id}
        onClick={() => updateNoteStatus(note, "trash", "sent to")}
      >
        delete
      </button>
    </div>
  );
}
