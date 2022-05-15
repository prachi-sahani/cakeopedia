import { useState } from "react";
import { useDBdata } from "../context/db-data-context";
import { useMessageHandling } from "../context/message-handling-context";
import { v4 as uuid } from "uuid";
import { bgColorPalette } from "../utilities/bg-color-palette";
import { LabelsDialog } from "./LabelsDialog";
import { useLocation, useNavigate } from "react-router-dom";

export function Note({ note }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { gridView } = useMessageHandling();
  const { notes, updateNote } = useDBdata();
  // to store data for which note(index), the color palette is open/close
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [showLabelsDialog, setShowLabelsDialog] = useState(false);
  function updateNoteStatus(type, msg) {
    updateNote(
      notes.map((element) =>
        element.id === note.id
          ? { ...note, [type]: !note[type], updatedOn: new Date() }
          : element
      ),
      `Note ${msg} ${type}!`,
      false
    );
  }

  function duplicateNote() {
    updateNote(
      [
        ...notes,
        { ...note, id: uuid(), updatedOn: new Date(), createdOn: new Date() },
      ],
      "Duplicate note created!",
      true
    );
  }

  function changeNoteBgColor(color) {
    updateNote(
      notes.map((element) =>
        element.id === note.id ? { ...note, bgColor: color } : element
      ),
      "Note background changed!",
      false
    );
  }

  function openNote() {
    navigate(`${location.pathname}/note/${note.id}`, {
      state: { background: location, note },
    });
  }

  function removeLabel(selectedLabel) {
    const dataToSend = notes.map((element) =>
      element.id === note.id
        ? {
            ...element,
            labels: element.labels.filter((item) => item !== selectedLabel),
          }
        : element
    );
    const msg = `"${selectedLabel}" label removed from the note!`;
    updateNote(dataToSend, msg, false);
  }

  function deleteNote(selectedNote) {
    updateNote(
      notes.filter((item) => item.id !== selectedNote.id),
      "Note permanently deleted!",
      false
    );
  }

  return (
    <div
      className={`note grid-item card card-basic ${
        gridView ? "col-1" : "col-3"
      } col-sm-3 bg-${note.bgColor}`}
    >
      <div className="card-header" onClick={() => openNote()}>
        <div className="card-title note-title py-1">{note.title}</div>
      </div>
      <div className="card-content note-content" onClick={() => openNote()}>
        {note.description}
      </div>

      <div className="card-footer note-footer">
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
        {location.pathname === "/notes/trash" ? (
          <div className="action-icons">
            <button
              title="Restore"
              className="btn-icon material-icons-outlined"
              onClick={() => updateNoteStatus("trash", "restored from")}
            >
              restore_from_trash
            </button>
            <button
              title="Delete permanently"
              className="btn-icon material-icons-outlined"
              onClick={() => deleteNote(note)}
            >
              delete_forever
            </button>
          </div>
        ) : (
          <div className="action-icons">
            <button
              title="New label"
              className="btn-icon material-icons-outlined"
              onClick={() => {
                setShowLabelsDialog((value) => !value);
              }}
            >
              new_label
            </button>
            {showLabelsDialog && <LabelsDialog note={note} editMode={false} />}
            <button
              title="Change card color"
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
              title="Duplicate"
              onClick={() => duplicateNote()}
            >
              content_copy
            </button>

            {note.archive && (
              <button
                title="Unarchive"
                className="btn-icon material-icons-outlined"
                onClick={() => updateNoteStatus("archive", "restored from")}
              >
                unarchive
              </button>
            )}
            {!note.archive && (
              <button
                title="Archive"
                className="btn-icon material-icons-outlined"
                onClick={() => updateNoteStatus("archive", "sent to")}
              >
                archive
              </button>
            )}
            <button
              title="Trash"
              className="btn-icon material-icons-outlined"
              onClick={() => updateNoteStatus("trash", "sent to")}
            >
              delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
