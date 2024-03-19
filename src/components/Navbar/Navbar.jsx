import React, { useState, useEffect } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom'; // Import Link from react-router-dom

import { images } from '../../constants';
import './Navbar.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [menuClass, setMenuClass] = useState('');
  const [listClass, setListClass] = useState('');
  const [activePage, setActivePage] = useState('home'); // Default active page is 'home'
  const [navbarBg, setNavbarBg] = useState({
    backgroundColor: 'rgba(40, 40, 40, 0)',
    transition: 'background-color 0.35s ease', // Add a transition property
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const body = document.body;

    if (toggle) {
      body.classList.add('menu-open');      
    } else {
      body.classList.remove('menu-open');      
    }

    // Event listener for scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isHomePage = activePage === 'home';

      const transitionDuration = isHomePage && scrollTop === 0 ? '0.5s' : '0.3s';

      setNavbarBg({
        backgroundColor:
          activePage === 'home' ? (scrollTop === 0 ? 'rgba(40, 40, 40, 0)' : 'rgba(40, 40, 40, 0.99)') : 'rgba(40, 40, 40, 0.99)',
        transition: `background-color ${transitionDuration} ease`,
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      body.classList.remove('menu-open');
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toggle]);

  const initiateMenuExit = () => {
    // Add the 'exited' class immediately
    setIsMenuOpen(false);
    setMenuClass('exited');
    setListClass('exited');

    // Wait for 600 milliseconds and then remove the 'exited' class
    setTimeout(() => {
      setMenuClass('');
      setListClass('');
      setToggle(false);
    }, 650); // Adjust the timeout based on your exit transition duration
  };

  const openMenu = () => {
    // Set the 'entered' class when opening the menu
    setIsMenuOpen(true);
    setMenuClass('entered');
    setListClass('entered');
    setToggle(true);
  };

  useEffect(() => {
    // Update activePage when the location changes
    setActivePage(location.pathname.replace('/', '') || 'home');
  }, [location]);

  return (
    <nav className={`app__navbar ${isMenuOpen ? 'app__navbar-menu-open' : ''}`} style={navbarBg}>
      <ul className="app__navbar-links">
        <li className="app__flex p-text">
          <div />
          <Link to="/NoNothing" onClick={() => setActivePage('home')}>
            <img src={images.logo} alt="logo" className="app__navbar-logo" />
          </Link>
        </li>
        {['home', 'playtest', 'press', 'support', 'contact'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            {/* Replace <a> with <Link> */}
            <Link 
              to={item === 'home' ? '/NoNothing' : `/NoNothing/${item.toLowerCase()}`}
              onClick={() => {
                setActivePage(item);
              }}
              className={activePage === item ? 'active' : ''}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu" id="app__navbar-menu">
        <svg className="menu-icon" onClick={openMenu}>
          <HiMenuAlt4 />
        </svg>
        {toggle && (
          <motion.div
            initial={{ y: -1000 }}
            animate={menuClass === 'exited' ? { y: -1000 } : { y: 0 }}
            className={menuClass}

            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 38,
            }}
          >
            <svg className="close-icon" onClick={initiateMenuExit}>
              <HiX />
            </svg>
            <ul>
              {['home', 'playtest', 'press', 'support', 'contact'].map((item, index) => (
                <motion.li key={item} className={listClass}>
                  <Link
                    to={item === 'home' ? '/NoNothing' : `/NoNothing/${item.toLowerCase()}`}
                    onClick={() => {
                      setToggle(false);
                      setActivePage(item);
                    }}
                    className={activePage === item ? 'active' : ''}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
