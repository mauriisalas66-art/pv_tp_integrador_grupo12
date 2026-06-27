// src/hooks/useFormCliente.js
import { useState } from 'react';

export const useFormCliente = (onAltaExitosa) => {
    const [nuevoCliente, setNuevoCliente] = useState({ firstname: '', lastname: '', email: '', phone: '', city: '', password: '' });
    const [guardando, setGuardando] = useState(false);
    const [errorModal, setErrorModal] = useState(null);

    const validarCampos = () => {
        const soloLetrasRegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const soloNumerosRegExp = /^[0-9]+$/;

        if (!nuevoCliente.firstname.trim() || !soloLetrasRegExp.test(nuevoCliente.firstname)) {
            setErrorModal("⚠️ El Nombre es obligatorio y no puede contener números.");
            return false;
        }
        if (!nuevoCliente.lastname.trim() || !soloLetrasRegExp.test(nuevoCliente.lastname)) {
            setErrorModal("⚠️ El Apellido es obligatorio y no puede contener números.");
            return false;
        }
        if (!nuevoCliente.email.trim() || !nuevoCliente.email.includes('@')) {
            setErrorModal("⚠️ Ingrese un correo electrónico válido que contenga un '@'.");
            return false;
        }
        if (!nuevoCliente.phone.trim() || !soloNumerosRegExp.test(nuevoCliente.phone) || nuevoCliente.phone.length < 10 || nuevoCliente.phone.length > 13) {
            setErrorModal("⚠️ El teléfono es obligatorio (solo números, entre 10 y 13 dígitos).");
            return false;
        }
        if (!nuevoCliente.city.trim() || !soloLetrasRegExp.test(nuevoCliente.city)) {
            setErrorModal("⚠️ La Ciudad es obligatoria y no puede contener números.");
            return false;
        }
        if (!nuevoCliente.password.trim() || nuevoCliente.password.length < 8) {
            setErrorModal("⚠️ La contraseña es obligatoria y debe tener un mínimo de 8 caracteres.");
            return false;
        }

        setErrorModal(null);
        return true;
    };

    const enviarRegistro = async () => {
        if (!validarCampos()) return;
        setGuardando(true);

        const clienteEnviar = {
            email: nuevoCliente.email,
            username: nuevoCliente.firstname.toLowerCase() + "123",
            password: nuevoCliente.password,
            name: { firstname: nuevoCliente.firstname, lastname: nuevoCliente.lastname },
            address: { city: nuevoCliente.city, street: 'Calle Falsa', number: 123, zipcode: '4600', geolocation: { lat: '0', long: '0' } },
            phone: nuevoCliente.phone
        };

        try {
            const respuesta = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                body: JSON.stringify(clienteEnviar)
            });

            if (!respuesta.ok) throw new Error('No se pudo registrar en el servidor remoto');
            const resultado = await respuesta.json(); 

            // Le avisamos al componente padre (ListaClientes) pasándole el ID y los datos tipeados
            onAltaExitosa(resultado.id, nuevoCliente);
            
            // Reseteamos el formulario local
            setNuevoCliente({ firstname: '', lastname: '', email: '', phone: '', city: '', password: '' });
        } catch (err) {
            setErrorModal(err.message);
        } finally {
            setGuardando(false);
        }
    };

    return {
        nuevoCliente,
        setNuevoCliente,
        guardando,
        errorModal,
        enviarRegistro
    };
};