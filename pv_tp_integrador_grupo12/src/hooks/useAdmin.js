import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext'; // <-- Importa el contexto original

export const useAdmin = () => {
  const contexto = useContext(AdminContext);
  if (!contexto) {
    throw new Error("⚠️ Error: useAdmin debe ser usado dentro de un AdminProvider");
  }
  return contexto;
};