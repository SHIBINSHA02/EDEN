import { useState } from "react";
import "./Navbar.css";

export const Navbar = ({ items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (link) => {
    setIsMenuOpen(false);

    // Smooth scroll to the target element
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="navbar">
      <button
        className="navbar-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      <ul className={isMenuOpen ? "active" : ""}>
        {items.map((item, idx) => (
          <li key={idx}>
            <button
              className="nav-link"
              onClick={() => handleClick(item.link)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
