import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addUserNote, getUserNotes } from "../utilities/server-request";
import { useAuth } from "./authorization-context";
import { useMessageHandling } from "./message-handling-context";
const DBdataContext = createContext();

function DBdataProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [notes, setNotes] = useState(null);
  const [labels, setLabels] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteUpdateLoading, setNoteUpdateLoading] = useState(false);
  const { showSnackbar, setShowErrorPage } = useMessageHandling();
  const { authToken } = useAuth();

  useEffect(() => {
    setNotes(null);
  }, [authToken]);
  
  async function getNotes() {
    try {
      setNotesLoading(true);
      const data = await getUserNotes(sessionStorage.getItem("uid"));
      const finalData = data.docs.map((doc) => doc.data())[0];
      if (finalData) {
        setNotes(finalData.notes);
        setLabels(finalData.labels);
      } else {
        setShowErrorPage(true);
      }
    } catch (err) {
      setShowErrorPage(true);
    } finally {
      setNotesLoading(false);
    }
  }

  async function updateNote(notesList, msg, closeNote) {
    try {
      setNoteUpdateLoading(true);
      const dataToSend = {
        userID: sessionStorage.getItem("uid"),
        notes: notesList,
        labels: labels,
      };
      await addUserNote(dataToSend);
      showSnackbar(msg);
      setNotes(notesList);
      if (closeNote) {
        navigate(location?.state?.background?.pathname ?? "/notes");
      }
    } catch (err) {
      showSnackbar("Some error occurred. Try Again!");
    } finally {
      setNoteUpdateLoading(false);
    }
  }

  async function updateUserLabels(labelsList, msg) {
    try {
      const dataToSend = {
        userID: sessionStorage.getItem("uid"),
        notes: notes,
        labels: labelsList,
      };
      await addUserNote(dataToSend);
      showSnackbar(msg);
      setLabels(labelsList);
    } catch (err) {
      showSnackbar("Some error occurred. Try Again!");
    }
  }

  async function updateNoteAndLabel(labelsList, notesList, msg) {
    try {
      const dataToSend = {
        userID: sessionStorage.getItem("uid"),
        notes: notesList,
        labels: labelsList,
      };
      await addUserNote(dataToSend);
      showSnackbar(msg);
      setNotes(notesList);
      setLabels(labelsList);
    } catch (err) {
      showSnackbar("Some error occurred. Try Again!");
    }
  }

  return (
    <DBdataContext.Provider
      value={{
        getNotes,
        notes,
        setNotes,
        notesLoading,
        updateNote,
        noteUpdateLoading,
        labels,
        updateUserLabels,
        setLabels,
        updateNoteAndLabel,
        searchFilter,
        setSearchFilter,
      }}
    >
      {children}
    </DBdataContext.Provider>
  );
}

const useDBdata = () => useContext(DBdataContext);

export { useDBdata, DBdataProvider };
