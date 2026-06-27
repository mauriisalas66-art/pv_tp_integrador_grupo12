// src/hooks/useClientes.js
import { useState, useEffect } from 'react';
import { clientService } from '../services/clientService';

export const useClientes = () => {
    const [clientes, setClientes] = useState([]);      
    const [loading, setLoading] = useState(true);        
    const [error, setError] = useState(null);            
    const [busqueda, setBusqueda] = useState('');        
    const [showModal, setShowModal] = useState(false); 
    const [alertaExito, setAlertaExito] = useState(null);

    // 🔄 Sincronización de la tabla con la persistencia del servicio
    useEffect(() => {
        const cargarClientes = async () => {
            try {
                setLoading(true);
                const datos = await clientService.obtenerTodos();
                setClientes(datos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        cargarClientes();
    }, []);

    // ➕ Callback que se activa cuando el hook del formulario termina con éxito
    const manejarAltaExitosa = (idAsignado, nuevoClienteForm) => {
        setShowModal(false);

        const clienteEstructurado = {
            id: Number(idAsignado),
            email: nuevoClienteForm.email,
            phone: nuevoClienteForm.phone,
            name: { firstname: nuevoClienteForm.firstname, lastname: nuevoClienteForm.lastname },
            address: { city: nuevoClienteForm.city }
        };

        const listaActualizada = [...clientes, clienteEstructurado];
        setClientes(listaActualizada);
        clientService.guardarBaseLocal(listaActualizada); // Sincroniza el disco

        setAlertaExito(`¡Cliente registrado con éxito! ID asignado: #${idAsignado}`);
        setTimeout(() => setAlertaExito(null), 4000);
    };

    // 🔍 Filtro y ordenamiento estricto de menor a mayor
    const clientesFiltrados = clientes
        .filter(cliente => {
            const nombre = cliente?.name?.firstname?.toLowerCase() || '';
            const apellido = cliente?.name?.lastname?.toLowerCase() || '';
            const ciudad = cliente?.address?.city?.toLowerCase() || '';
            const terminoBusqueda = busqueda.toLowerCase();

            return nombre.includes(terminoBusqueda) || apellido.includes(terminoBusqueda) || ciudad.includes(terminoBusqueda);
        })
        .sort((a, b) => Number(a.id) - Number(b.id));

    return {
        clientesFiltrados, loading, error, busqueda, setBusqueda,
        showModal, setShowModal, alertaExito, manejarAltaExitosa
    };
};