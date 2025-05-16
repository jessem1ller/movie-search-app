import React from 'react'

const Navbar
 = () => {
    function openMenu(): void {
        const backdrop = document.querySelector('.menu__backdrop') as HTMLElement | null;
        if (backdrop) {
            backdrop.style.visibility = 'visible';
        }
    }
    function closeMenu(): void {
        const backdrop = document.querySelector('.menu__backdrop') as HTMLElement | null;
        if (backdrop) {
            backdrop.style.visibility = 'hidden';
        }
    }
  return (
    <section id="movies__body">
      <nav>
        <div className="nav__background--img">
          <div className="nav__container">
            <img className="logo" src="assets/Movie Database.png" alt="" />
            <ul className="nav__links">
              <li><a href="#" className="nav__link">Home</a></li>
              <li><a href="#" className="nav__link">Contact</a></li>
              <li>
                <a href="#" className="nav__link nav__link--primary">Movies</a>
              </li>
            </ul>
            <button className="btn__menu" onClick={() => openMenu()}>
              <i className="fas fa-bars"></i>
            </button>
            <div className="menu__backdrop" style={{ visibility: "hidden" }}>
              <button className="btn__menu btn__menu--close" onClick={() => closeMenu()}>
                <i className="fas fa-times"></i>
              </button>
              <ul className="menu__links">
                <li className="menu__list">
                  <a href="#" className="menu__link" onClick={() => closeMenu()}>Home</a>
                </li>
                <li className="menu__list">
                  <a href="#features" className="menu__link" onClick={() => closeMenu()}
                    >Movies</a>
                </li>
                <li className="menu__list">
                  <a className="menu__link no-cursor" onClick={() => closeMenu()}
                    >Contacts</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </section>
  )
};

export default Navbar;
