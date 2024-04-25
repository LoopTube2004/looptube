import React from 'react';
import styles from './Navbar.module.css'; // Import the CSS module
import LogoutButton from './LogoutButton';
import { useSelector, useDispatch } from 'react-redux';


function Navbar() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Other nav items can be placed here */}
        {user && <div className={styles.logoutButton}>
          <LogoutButton />
        </div>}
      </div>
    </nav>
  );
}

export default Navbar;
