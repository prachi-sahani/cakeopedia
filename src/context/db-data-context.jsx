import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserNote, getUserNotes } from "../utilities/server-request";
import { useMessageHandling } from "./message-handling-context";
const DBdataContext = createContext();

function DBdataProvider({ children }) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(null);
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteUpdateLoading, setNoteUpdateLoading] = useState(false);
  const { showSnackbar, setShowErrorPage } = useMessageHandling();
  async function getNotes() {
    try {
      setNotesLoading(true);
      const data = await getUserNotes(sessionStorage.getItem("uid"));
      const finalData = data.docs.map((doc) => doc.data().notes)[0];
      if (finalData) {
        setNotes(data.docs.map((doc) => doc.data().notes)[0]);
      } else {
        setShowErrorPage(true);
      }
    } catch (err) {
      setShowErrorPage(true);
    } finally {
      setNotesLoading(false);
    }
  }

  async function updateNote(notesList, msg) {
    try {
      setNoteUpdateLoading(true);
      await addUserNote(sessionStorage.getItem("uid"), notesList);
      showSnackbar(msg);

      setNotes(notesList);
      navigate("/notes");
    } catch (err) {
      showSnackbar("Some error occurred. Try Again!");
    } finally {
      setNoteUpdateLoading(false);
    }
  }

  return (
    <DBdataContext.Provider
      value={{ getNotes, notes, notesLoading, updateNote, noteUpdateLoading }}
    >
      {children}
    </DBdataContext.Provider>
  );
}

const useDBdata = () => useContext(DBdataContext);

export { useDBdata, DBdataProvider };
