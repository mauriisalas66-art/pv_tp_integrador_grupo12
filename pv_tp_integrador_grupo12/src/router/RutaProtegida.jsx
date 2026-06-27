// src/router/RutaProtegida.jsx
import { Navigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin"; // <-- Ahora apunta directo a tu carpeta de ganchos

const RutaProtegida = ({ children }) => {
  // 🔥 ¡REEMPLAZADO! Ya no depende de useContext ni de AdminContext.
  const { admin } = useAdmin();

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;