// src/services/authService.js

export const authService = (() => {
  const administradores = [
    { 
      id: 1, 
      user: "jairo@mail.com", 
      password: "12345678",    
      nombre: "Jairo Almazán", 
      rol: "Gerencia" 
    },
    { 
      id: 2, 
      user: "cami@mail.com", 
      password: "12345678",    
      nombre: "Camila Mansilla", 
      rol: "Soporte" 
    },
    { 
      id: 3, 
      user: "ale@mail.com", 
      password: "12345678",    
      nombre: "Alessandro Nieves", 
      rol: "Soporte"
    }
  ];

  // Ya no recibe el parámetro "sector"
  const login = (user, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Busca al administrador que coincida estrictamente con el mail y la contraseña ingresados
        const encontrado = administradores.find(
          (admin) => admin.user === user && admin.password === password
        );

        if (encontrado) {
          // El servicio lee y despacha automáticamente el rol guardado en la base
          resolve({ nombre: encontrado.nombre, rol: encontrado.rol });
        } else {
          reject(new Error("Credenciales incorrectas. Verifique usuario y contraseña."));
        }
      }, 800); 
    });
  };

  return { login };
})();