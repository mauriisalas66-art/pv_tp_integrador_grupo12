// src/hooks/useDetalleCliente.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const useDetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [alertaBajaExitosa, setAlertaBajaExitosa] = useState(null);

  useEffect(() => {
    const cargarExpediente = () => {
      try {
        setLoading(true);
        // Buscamos la base de clientes persistente en LocalStorage
        const baseLocal = localStorage.getItem('base_clientes');
        
        if (!baseLocal) {
          throw new Error('No se encontró la base de datos local.');
        }

        const listaClientes = JSON.parse(baseLocal);
        // Buscamos al cliente que coincida con el ID de la URL
        const clienteEncontrado = listaClientes.find(c => c.id === Number(id));

        if (!clienteEncontrado) {
          throw new Error('El cliente solicitado no existe en el sistema.');
        }

        setCliente(clienteEncontrado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarExpediente();
  }, [id]);

  // Lógica de borrado permanente en el navegador
  const handleEliminar = async () => {
    if (!window.confirm('¿Está seguro de que desea eliminar este cliente de la base local?')) return;

    try {
      setEliminando(true);

      const baseLocal = localStorage.getItem('base_clientes');
      if (baseLocal) {
        const listaClientes = JSON.parse(baseLocal);
        // Filtramos para sacar al cliente actual de la lista
        const listaFiltrada = listaClientes.filter(c => c.id !== Number(id));
        
        // Impactamos la nueva lista limpia en el disco duro del navegador
        localStorage.setItem('base_clientes', JSON.stringify(listaFiltrada));
      }

      setAlertaBajaExitosa(`🗑️ ¡Cliente #${id} dado de baja de forma permanente de la netbook!`);
      
      setTimeout(() => {
        navigate('/clientes');
      }, 1500);

    } catch (err) {
      alert("Error al intentar eliminar: " + err.message);
      setEliminando(false);
    }
  };

  return {
    id,
    cliente,
    loading,
    error,
    eliminando,
    alertaBajaExitosa,
    handleEliminar
  };
};