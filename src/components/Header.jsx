import React, { useState, useEffect } from 'react';
import './Header.css';
import logoGif from '../assets/logo.gif';  // Importa el GIF del logo
import separadorImg from '../assets/separador.png';

const Header = ({ setSelectedBrand, setSortedProducts }) => {
  const [priceOrder, setPriceOrder] = useState('desc'); // Orden de precio
  const [sizeOrder, setSizeOrder] = useState('desc'); // Orden de tamaño
  const [screenOrder, setScreenOrder] = useState('desc'); // Orden de pantalla
  const [menuOpen, setMenuOpen] = useState(false); // Estado para abrir/cerrar el menú desplegable

  useEffect(() => {
    const handleScroll = () => {
      const body = document.querySelector('body');
      if (window.scrollY > 50) {
        body.classList.add('scroll');
      } else {
        body.classList.remove('scroll');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para ordenar los productos por precio
  const sortByPrice = () => {
    const newOrder = priceOrder === 'desc' ? 'asc' : 'desc'; // Alternar entre ascendente y descendente
    setPriceOrder(newOrder);

    setSortedProducts((prevProducts) =>
      [...prevProducts].sort((a, b) =>
        newOrder === 'desc' ? b.price - a.price : a.price - b.price
      )
    );
  };

  // Función para ordenar los productos por tamaño
  const sortBySize = () => {
    const newOrder = sizeOrder === 'desc' ? 'asc' : 'desc'; // Alternar entre ascendente y descendente
    setSizeOrder(newOrder);

    setSortedProducts((prevProducts) =>
      [...prevProducts].sort((a, b) =>
        newOrder === 'desc'
          ? parseFloat(b.size.split(' x ')[0]) - parseFloat(a.size.split(' x ')[0])
          : parseFloat(a.size.split(' x ')[0]) - parseFloat(b.size.split(' x ')[0])
      )
    );
  };

  // Función para ordenar los productos por tamaño de pantalla
  const sortByScreenSize = () => {
    const newOrder = screenOrder === 'desc' ? 'asc' : 'desc'; // Alternar entre ascendente y descendente
    setScreenOrder(newOrder);

    setSortedProducts((prevProducts) =>
      [...prevProducts].sort((a, b) =>
        newOrder === 'desc' ? b.screenSize - a.screenSize : a.screenSize - b.screenSize
      )
    );
  };

  // Función para manejar la apertura y cierre del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={logoGif} alt="Logo" /> {/* Muestra el logo GIF */}
        </div>
        <nav className="navbar">
          {/* Botón "MARCAS" con menú desplegable */}
          <div className="nav-link dropdown" onClick={toggleMenu}>
            MARCAS
            {menuOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => setSelectedBrand('')}>TODOS</li>
                <li onClick={() => setSelectedBrand('Samsung')}>SAMSUNG</li>
                <li onClick={() => setSelectedBrand('Apple')}>IPHONE</li>
                <li onClick={() => setSelectedBrand('Xiaomi')}>XIAOMI</li>
                <li onClick={() => setSelectedBrand('OnePlus')}>ONEPLUS</li>
              </ul>
            )}
          </div>

          {/* Botones fuera del menú desplegable */}
          <button className="nav-link">NOSOTROS</button>
          <button className="nav-link">ENVIOS</button>
          <button className="nav-link">CARRITO</button>
        </nav>
      </header>

      <div className="sidebar">
        <img src={separadorImg} alt="Separador" className="sidebar-separator" />
        <h3>Filtrar por:</h3>
        <button onClick={sortByPrice}>Precio</button>
        <button onClick={sortBySize}>Tamaño</button>
        <button onClick={sortByScreenSize}>Pantalla</button>
      </div>
    </>
  );
};

export default Header;
