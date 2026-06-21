// src/views/Login.jsx
import { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { loginService } from '../services/authService';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // CONSUMO DEL CONTEXTO (Commit 11)
  const { setAdmin } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamamos al servicio con los datos simulados que ya programaste
      const userData = await loginService(email, password);
      
      // Guardamos al operador en el estado global si pasa las validaciones
      setAdmin(userData);
      alert("¡Conexión exitosa! Bienvenido " + userData.nombre);
    } catch (error) {
      alert(error.message); // Muestra el error de los 8 caracteres si falla
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Iniciar Sesión - Operador</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correo Electrónico:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};