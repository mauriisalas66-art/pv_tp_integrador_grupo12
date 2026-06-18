// src/services/authService.js

/**

 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} 
 */
export const loginService = async (email, password) => {
  if (!password || password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  }

  if (!email || !email.includes("@")) {
    throw new Error("Por favor, ingrese un correo electrónico válido.");
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        email: email,
        token: "fake-jwt-token-grupo12",
        status: "success"
      });
    }, 1000);
  });
};