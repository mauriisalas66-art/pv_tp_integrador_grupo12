// src/views/Login.jsx
import { useState } from 'react';

export const Login = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [sector, setSector] = useState('');

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Acceso al Sistema - Operador</h2>
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre del Operador:</label>
          <input 
            type="text" 
            placeholder="Escribí tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correo Electrónico:</label>
          <input 
            type="email" 
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Sector de la Empresa:</label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            style={{ width: '100%', padding: '8px', cursor: 'pointer' }}
            required
          >
            <option value="" disabled>-- Seleccione un Sector --</option>
            <option value="Soporte">Soporte</option>
            <option value="Gerencia">Gerencia</option>
          </select>
        </div>

        <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};