import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";

function useToken() {
  const [token, setToken] = useState<string>();
  useEffect(() => {
    setToken(localStorage.getItem("access_token") || "");
  }, []);
  return { token, setToken };
}

// I called this UserContext even though for now it only has the token cuz in a full blown app
// the token would belong to the global user, probably stored in redux.
export const UserContext = React.createContext<ReturnType<typeof useToken>>({
  token: "",
  setToken: () => {},
});

function App() {
  const { token, setToken } = useToken();

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <div className="layout">
        <div className="header">
          <h1>Music with Lev 💚</h1>
        </div>
        {token ? <HomePage /> : <LoginPage />}
        <div className="footer" />
      </div>
    </UserContext.Provider>
  );
}

export default App;
