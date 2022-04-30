import { useContext, useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, signup, updateUser } from "../utilities/server-request";
import { useMessageHandling } from "./message-handling-context";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(
    sessionStorage.getItem("token") || ""
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoadingLoginAsGuest, setIsLoadingLoginAsGuest] = useState(false);
  const [isLoadingLoginUser, setIsLoadingLoginUser] = useState(false);
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const { showSnackbar } = useMessageHandling();
  async function loginAsGuest() {
    try {
      setIsLoadingLoginAsGuest(true);
      // default credentials
      const data = {
        email: "sample@email.com",
        password: "123456",
      };
      const token = await login(data);
      setIsLoadingLoginAsGuest(false);
      setAuthToken(token.user.accessToken);
      sessionStorage.setItem(
        "token",
        token.user.accessToken ? token.user.accessToken : ""
      );
      const lastRoute = location?.state?.from?.pathname || "/notes";
      navigate(lastRoute);
    } catch (err) {
      setIsLoadingLoginAsGuest(false);
      showSnackbar(
        err?.message
          ? err.message.split(":")[1]
          : "Some error occurred. Try again!"
      );
    }
  }
  async function loginUser(email, password) {
    try {
      setIsLoadingLoginUser(true);
      const data = {
        email,
        password,
      };
      const token = await login(data);
      setIsLoadingLoginUser(false);
      setAuthToken(token.user.accessToken);
      sessionStorage.setItem("token", token.user.accessToken);
      const lastRoute = location?.state?.from?.pathname || "/notes";
      navigate(lastRoute);
    } catch (err) {
      setIsLoadingLoginUser(false);
      showSnackbar(
        err?.message
          ? err.message.split(":")[1]
          : "Some error occurred. Try again!"
      );
    }
  }

  async function signupUser(data) {
    try {
      setIsLoadingSignup(true);
      const token = await signup(data);
      const user = await updateUser(data.name)
      setIsLoadingSignup(false);
      setAuthToken(token.user.accessToken);
      sessionStorage.setItem("token", token.user.accessToken);
      const lastRoute = location?.state?.from?.pathname || "/notes";
      navigate(lastRoute);
    } catch (err) {
      setIsLoadingSignup(false);
      showSnackbar(
        err?.message
          ? err.message.split(":")[1]
          : "Some error occurred. Try again!"
      );
    }
  }
  function logout() {
    sessionStorage.setItem("token", "");
    setAuthToken("");
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        loginAsGuest,
        logout,
        isLoadingLoginAsGuest,
        loginUser,
        isLoadingLoginUser,
        signupUser,
        isLoadingSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
