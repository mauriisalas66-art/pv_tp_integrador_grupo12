// src/services/clientService.js

export const clientService = {
  // 📡 Trae todos los clientes (Chequea primero LocalStorage)
  obtenerTodos: async () => {
    const baseLocal = localStorage.getItem('base_clientes');
    
    // Si ya existe la copia local en el navegador, la devuelve convertida en objeto
    if (baseLocal) {
      return JSON.parse(baseLocal);
    }
    
    // Si no hay nada, va a la API externa por única vez
    const respuesta = await fetch('https://fakestoreapi.com/users');
    if (!respuesta.ok) throw new Error('No se pudo conectar con el servidor de clientes');
    const datos = await respuesta.json();
    
    // Guarda los datos iniciales en LocalStorage para las próximas veces
    localStorage.setItem('base_clientes', JSON.stringify(datos));
    return datos;
  },

  // 💾 Guarda la lista completa actualizada en LocalStorage
  guardarBaseLocal: (nuevaLista) => {
    localStorage.setItem('base_clientes', JSON.stringify(nuevaLista));
  }
};