export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2026 - Grupo 12</p>
      <p>Proyecto desarrollado con React</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#242424",
    color: "white",
    textAlign: "center",
    padding: "20px",
    marginTop: "30px",
  },
};