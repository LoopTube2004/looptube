import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { restartForm } from '../features/formSlice';
import styles from './LogoutButton.module.css'; // Import the CSS module

const LogoutButton = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        localStorage.removeItem('user');
        dispatch(logout()); //Delete the user redux state
        dispatch(restartForm()); //Delete the form redux state
    };

    return (
        <button onClick={handleClick} className={styles.button}>Log Out</button>
    );
};

export default LogoutButton;
