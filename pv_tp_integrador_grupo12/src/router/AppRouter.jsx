import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import App from '../App'; 
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import ListaClientes from '../views/ListaClientes';
import DetalleCliente from '../views/DetalleCliente';
import RutaProtegida from './RutaProtegida'; 

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
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