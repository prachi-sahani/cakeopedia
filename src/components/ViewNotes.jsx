import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDBdata } from "../context/db-data-context";
import { useMessageHandling } from "../context/message-handling-context";
import "../stylesheets/view-notes.css";
import { Loader } from "./Loader";
import { v4 as uuid } from "uuid";
import { bgColorPalette } from "../utilities/bg-color-palette";
import { LabelsDialog } from "./LabelsDialog";

export function ViewNotes() {
  const { gridView } = useMessageHandling();
  const { getNotes, notes, notesLoading, updateNote, labels, setLabels } =
    useDBdata();
  const [notesToDisplay, setNotesToDisplay] = useState([]);
  // to store data for which note(index), the color palette is open/close
  const [showColorPalette, setShowColorPalette] = useState({
    isOpen: false,
    index: -1,
  });
  const [showLabelsDialog, setShowLabelsDialog] = useState({
    isOpen: false,
    index: -1,
  });
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
      `Note sent to ${type}!`,
      true
    );
  }

  function duplicateNote(note) {
    updateNote(
      [...notes, { ...note, id: uuid() }],
      "Duplicate note created!",
      true
    );
  }

  function changeNoteBgColor(note, color) {
    updateNote(
      notes.map((element) =>
        element.id === note.id ? { ...note, bgColor: color } : element
      ),
      "Note background changed!",
      false
    );
  }

  function openNote(note) {
    navigate(`/notes/note/${note.id}`, {
      state: { background: location, note },
    });
  }

  return (
    <main className="view-notes mb-5">
      {notesLoading && <Loader />}
      <div className="notes grid-container grid-3 ">
        {notesToDisplay?.map((note, index) => (
          <div
            key={index}
            className={`note grid-item card card-basic ${
              gridView ? "col-1" : "col-3"
            } col-sm-3 bg-${note.bgColor}`}
          >
            <div className="card-header" onClick={() => openNote(note)}>
              <div className="card-title note-title py-1">{note.title}</div>
            </div>
            <div
              className="card-content note-content"
              onClick={() => openNote(note)}
            >
              {note.description}
            </div>
            <div className="card-footer note-footer">
              <div className="action-icons">
                <button
                  className="btn-icon material-icons-outlined"
                  onClick={() => {
                    setShowLabelsDialog((value) =>
                      value.index === index
                        ? { ...value, isOpen: !value.isOpen }
                        : { ...value, isOpen: true, index: index }
                    );
                  }}
                >
                  new_label
                </button>
                {showLabelsDialog.isOpen &&
                  showLabelsDialog.index === index && (
                    <LabelsDialog note={note} editMode={false} />
                  )}
                <button
                  className="btn-icon material-icons-outlined"
                  onClick={() =>
                    setShowColorPalette((value) =>
                      value.index === index
                        ? { ...value, isOpen: !value.isOpen }
                        : { ...value, isOpen: true, index: index }
                    )
                  }
                >
                  color_lens
                </button>
                {showColorPalette.isOpen && showColorPalette.index === index && (
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
