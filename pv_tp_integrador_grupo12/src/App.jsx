import { Outlet } from "react-router-dom";
import NatBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NatBar />

      <main className="container py-3 flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );

};

export default App;