// src/App.jsx
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

const App = () => {
  return <RouterProvider router={AppRouter} />;
};

export default App;