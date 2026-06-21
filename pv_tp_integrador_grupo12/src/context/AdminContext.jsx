// src/context/AdminContext.jsx
import { createContext, useState, useEffect } from 'react'; 

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    if (admin) {
    
      localStorage.setItem('operador_sesion', JSON.stringify(admin));
    } else {
    
      localStorage.removeItem('operador_sesion');
    }
  }, [admin]);

  const login = (userData) => {
    setAdmin(userData);
  };

  const logout = () => {
    setAdmin(null);
  };
  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};