import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import "./App.css";
import { Login } from "./pages/Login";
import { PageNotFound } from "./pages/PageNotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="*" exact={true} element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
