const Header = ({ title, desc }) => {
  return (
    <div className="header">
      <img src="../img/tick.png" width="100px" style={{ marginRight: "20%" }} />
      <div>
        <h1 style={{ marginBottom: "0px", color: "white" }}>{title}</h1>
        <p style={{ marginTop: "0px", color: "white" }}>{desc}</p>
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: "Profile Page",
  desc: "Welcome to Agrouction",
};

export default Header;
