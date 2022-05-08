import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup, Notes, PageNotFound } from "./pages";
import "./App.css";
import { useMessageHandling } from "./context/message-handling-context";
import { Snackbar } from "./components";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  const { errorMessage } = useMessageHandling();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route
          path="notes/*"
          element={
            <RequireAuth>
              <Notes />
            </RequireAuth>
          }
        ></Route>
        <Route path="*" exact={true} element={<PageNotFound />} />
      </Routes>
      {errorMessage && <Snackbar />}
    </div>
  );
}

export default App;
