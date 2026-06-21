import { Container } from 'react-bootstrap';

const Footer = () => {

  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white-50 text-center py-3 mt-auto shadow-lg border-top border-secondary">
      <Container>
        <p className="mb-1 small fw-bold text-light">
          Programación Visual — Trabajo Práctico Final Integrador
        </p>
        <p className="mb-0 x-small">
          © {anioActual} - Desarrollado por el <strong>Grupo 12</strong>.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;