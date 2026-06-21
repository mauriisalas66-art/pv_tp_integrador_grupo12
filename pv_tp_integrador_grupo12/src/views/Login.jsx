// src/views/Login.jsx
import { useState } from 'react';

export const Login = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Acceso al Sistema - Operador</h2>
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre del Operador:</label>
          <input 
            type="text" 
            placeholder="Escribí tu nombre"
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Sector de la Empresa:</label>
          {/* El selector fino lo agregamos en los próximos commits */}
          <input 
            type="text" 
            placeholder="Sector asignado"
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