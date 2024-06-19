import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const AuthContextComponent = createContext();
export const useAuth = () => useContext(AuthContextComponent);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) navigate("/chats");
    });
  }, [user, navigate]);
  const value = { user };
  return (
    <AuthContextComponent.Provider value={value}>
      {!loading && children}
    </AuthContextComponent.Provider>
  );
};
