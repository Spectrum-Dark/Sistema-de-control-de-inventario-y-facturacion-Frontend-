import { useContext } from "react";
import { AuthContext } from "../../context/sesion/AuthContext";

export const useAuth = () => useContext(AuthContext);