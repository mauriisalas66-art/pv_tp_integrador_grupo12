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

  const login = (user, password, sector) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const encontrado = administradores.find(
          (admin) => admin.user === user && admin.password === password && admin.rol === sector
        );

        if (encontrado) {
          resolve({ nombre: encontrado.nombre, rol: encontrado.rol });
        } else {
          reject(new Error("Credenciales incorrectas o sector equivocado"));
        }
      }, 800); 
    });
  };

  return { login };
})();