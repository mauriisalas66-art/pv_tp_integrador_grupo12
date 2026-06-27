// src/router/AppRouter.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LayoutPrincipal from '../components/layout/LayoutPrincipal'; 
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import ListaClientes from '../views/ListaClientes';
import DetalleCliente from '../views/DetalleCliente';
import RutaProtegida from './RutaProtegida'; 

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPrincipal />, 
    children: [
      {
        index: true, 
        element: <Login />
      },
      {
        path: 'dashboard',
        element: <RutaProtegida><Dashboard /></RutaProtegida>
      },
      {
        path: 'clientes',
        element: <RutaProtegida><ListaClientes /></RutaProtegida>
      },
      {
        path: 'clientes/:id',
        element: <RutaProtegida><DetalleCliente /></RutaProtegida>
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);