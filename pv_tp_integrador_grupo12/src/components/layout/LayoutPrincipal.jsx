import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; 

const LayoutPrincipal = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar /> 
      <main className="container py-3 flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPrincipal;