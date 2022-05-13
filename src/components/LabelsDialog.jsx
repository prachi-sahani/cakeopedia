import { useState } from "react";
import { useDBdata } from "../context/db-data-context";
import "../stylesheets/label-dialog.css";

export function LabelsDialog({ note, editMode, setNote }) {
  const { updateUserLabels, updateNote, notes, labels, updateNoteAndLabel } =
    useDBdata();
  const [labelInput, setLabelInput] = useState("");
  const [filteredLabels, setFilteredLabels] = useState(labels);

  function changeLabelText(value) {
    setFilteredLabels(
      labels.filter((label) =>
        label.toLowerCase().includes(value.toLowerCase())
      )
    );
    setLabelInput(value);
  }

  function updateLabels(selectedNote, labelToUpdate, isLabelChecked) {
    if (!editMode) {
      let dataToSend = [];
      let msg = "";
      if (isLabelChecked) {
        // add labels for the selected note if the checkbox is checked
        dataToSend = notes.map((element) =>
          element.id === selectedNote.id
            ? {
                ...element,
                labels: [...element.labels, labelToUpdate],
              }
            : element
        );
        msg = `"${labelToUpdate}" label added to the note!`;
      } else {
        // filter out unchecked label for the selected note
        dataToSend = notes.map((element) =>
          element.id === selectedNote.id
            ? {
                ...element,
                labels: element.labels.filter((item) => item !== labelToUpdate),
              }
            : element
        );
        msg = `"${labelToUpdate}" label removed from the note!`;
      }
      updateNote(dataToSend, msg, false);
    } else {
      // directly update data in db for view notes page
      let updatedNote = null;
      if (isLabelChecked) {
        updatedNote = {
          ...selectedNote,
          labels: [...selectedNote.labels, labelToUpdate],
        };
      } else {
        updatedNote = {
          ...selectedNote,
          labels: selectedNote.labels.filter((item) => item !== labelToUpdate),
        };
      }
      setNote(updatedNote);
    }
  }

  function updateLabelsList(selectedNote, value) {
    if (editMode) {
      // update note labels - edit/add note page
      setNote({ ...note, labels: [...note.labels, value] });
      // update labels list in db
      updateUserLabels([value, ...labels], `"${value}" label created!`);
    } else {
      // directly update notes in db - view notes page
      updateNoteAndLabel(
        [value, ...labels],
        notes.map((element) =>
          element.id === selectedNote.id
            ? { ...element, labels: [...element.labels, value] }
            : element
        ),
        `"${value}" label created & added to the note!`,
        false
      );
    }
    // update displayed list of labels
    setFilteredLabels([value, ...labels]);
    setLabelInput("");
  }

  return (
    <div className="labels-note">
      <p className="txt txt-bold pl-2">Label note</p>
      <input
        className="label-input m-2"
        type="text"
        name="label-name"
        id="label-name"
        placeholder="Enter label name"
        required
        value={labelInput}
        onChange={(e) => changeLabelText(e.target.value)}
        autoComplete="off"
      />
      <div className="labels-list">
        {filteredLabels?.map((label, i) => (
          <p key={i} className="txt checkbox-input-group">
            <input
              type="checkbox"
              onChange={(e) => updateLabels(note, label, e.target.checked)}
              checked={note.labels.includes(label)}
              name="label"
              className="label-checkbox"
              value={label}
            />
            <label htmlFor="playlist">{label}</label>
          </p>
        ))}
      </div>
      {labelInput && <hr />}
      {labelInput && (
        <button
          className=" btn-link btn-w-icon btn-create-label"
          onClick={() => updateLabelsList(note, labelInput)}
        >
          <i className="material-icons">add</i>
          {`Create "${labelInput}" Label`}
        </button>
      )}
    </div>
  );
}
