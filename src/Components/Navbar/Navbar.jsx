import { useState } from "react";
import "./Navbar.css";

export const Navbar = ({ items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Remove the # from the link to get the element ID
    const targetId = link.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Calculate offset for fixed navbar (adjust this value based on your navbar height)
      const navbarHeight = 100; // Adjust this value as needed
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="navbar">
      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={isMenuOpen ? "active" : ""}>
        {items.map((item, idx) => (
          <li key={idx}>
            <a href={item.link} onClick={(e) => handleNavClick(e, item.link)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
