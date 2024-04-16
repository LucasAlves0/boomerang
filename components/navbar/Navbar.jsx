import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const user = true;
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Boomerang</span>
        </a>
        <a href="/">Home</a>
        <a href="/">Sobre</a>
        <a href="/">Contato</a>
        <a href="/">Agentes</a>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img
              src=" "
              alt=""
            />
            <span>Thiago Madella</span>
            <Link to="/profile" className="profile">
              <div className="notification">0</div>
              <span>Conta</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/">Sign in</a>
            <a href="/" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">Sobre</a>
          <a href="/">Contato</a>
          <a href="/">Agentes</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
