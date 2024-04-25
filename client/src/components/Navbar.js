import React from 'react';
import styles from './Navbar.module.css'; // Import the CSS module
import LogoutButton from './LogoutButton';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Other nav items can be placed here */}
        <div className={styles.logoutButton}>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
