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

        {/* Mantenemos temporalmente este input hasta el próximo commit del Select */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Sector de la Empresa:</label>
          <input 
            type="text" 
            placeholder="Sector asignado"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
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