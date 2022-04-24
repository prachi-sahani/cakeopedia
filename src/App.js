import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";
import { PageNotFound } from "./pages/PageNotFound";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { useMessageHandling } from "./context/message-handling-context";
import { Snackbar } from "./components/Snackbar";

function App() {
  const { errorMessage } = useMessageHandling();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="*" exact={true} element={<PageNotFound />} />
      </Routes>
      {errorMessage && <Snackbar />}
    </div>
  );
}

export default App;
