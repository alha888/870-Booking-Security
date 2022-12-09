import "./navbar.css";
import { Link,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Alvin</span>
        </Link>
        {user ? (
        <div>
        <p> {user.username} </p>
        <button className="logoutButton" onClick={() => navigate("/")}>Logout</button>
        </div>)
        : (
          <div className="navItems">
            <button className="navButton" onClick={() => navigate("/register")}>Register</button>
            <button className="navButton" onClick={() => navigate("/login")}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
