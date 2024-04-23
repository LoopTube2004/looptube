import React from "react";
import styles from "./Login.module.css"; // Make sure to create a corresponding CSS file
import GoogleLoginButton from "../components/GoogleLoginButton";


function Login() {
    return (
        <div className={styles["login-container"]}>
            <div className={styles["login-box"]}>
                <button className={styles["login-button"]}>
                    Sign in with Google
                </button>
                <GoogleLoginButton/>
            </div>
        </div>
    );
}

export default Login;
