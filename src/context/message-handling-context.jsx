import { useState, createContext, useContext } from "react";

const MessageHandlingContext = createContext();

function MessageHandlingProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showSidenav, setShowSidenav] = useState(false);
  const [gridView, setGridView] = useState(true);

  function showSnackbar(message) {
    setErrorMessage(message);
  }

  function dismissSnackbar() {
    setErrorMessage("");
  }
  return (
    <MessageHandlingContext.Provider
      value={{
        showSnackbar,
        dismissSnackbar,
        errorMessage,
        showSidenav,
        setShowSidenav,
        gridView,
        setGridView,
      }}
    >
      {children}
    </MessageHandlingContext.Provider>
  );
}

const useMessageHandling = () => useContext(MessageHandlingContext);

export { useMessageHandling, MessageHandlingProvider };
