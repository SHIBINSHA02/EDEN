import { useState } from "react";
import "./Navbar.css";

export const Navbar = ({ items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={isMenuOpen ? "active" : ""}>
        {items.map((item, idx) => (
          <li key={idx}>
            <a href={item.link} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
