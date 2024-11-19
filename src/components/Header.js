import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
 // import { useDispatch, useSelector } from "react-redux";
// import { login, logout } from "../reducers/user";


const Header = () => {
 return (
    <>
    <header className={styles.header}>
        <img className={styles.logo} id="logo" src="/logo.jpg" alt="logo" />
        <p className={styles.slogan}></p>

        <div className={styles.navbar}>
          <nav className={styles.viewer}>
            <Link className={styles.links} href="/">Home</Link>
            <Link className={styles.links} href="/">Commentaires</Link>
            <Link className={styles.links} href="/login">Connexion</Link>
            <Link className={styles.links} href="/register">S'inscrire</Link>
            
           
          </nav>
        </div>
      </header>
    </>
 )
  
}

export default Header;