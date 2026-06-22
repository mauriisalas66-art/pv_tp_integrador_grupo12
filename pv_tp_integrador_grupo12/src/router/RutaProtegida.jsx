// src/router/RutaProtegida.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const RutaProtegida = ({ children }) => {
  const { admin } = useContext(AdminContext);

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;