
const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Mi App</h2>

      <ul style={styles.menu}>
        <li><a href="/">Inicio</a></li>
        <li><a href="/productos">Formulario</a></li>

      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#282c34",
  },
  logo: {
    color: "white",
    margin: 0,
  },
  menu: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
};

export default Navbar;