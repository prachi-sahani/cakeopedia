import { createContext, useContext, useState } from "react";
import { getUserNotes } from "../utilities/server-request";
const DBdataContext = createContext();

function DBdataProvider({ children }) {
  const [notes, setNotes] = useState(null);
  const [notesLoading, setNotesLoading] = useState(false);
  async function getNotes() {
    try {
      setNotesLoading(true);
      const data = await getUserNotes(sessionStorage.getItem("uid"));
      setNotes(data.docs.map((doc) => doc.data().notes)[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setNotesLoading(false);
    }
  }
  return (
    <DBdataContext.Provider value={{ getNotes, notes, notesLoading }}>
      {children}
    </DBdataContext.Provider>
  );
}

const useDBdata = () => useContext(DBdataContext);

export { useDBdata, DBdataProvider };
