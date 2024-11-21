import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
 // import { useDispatch, useSelector } from "react-redux";
// import { login, logout } from "../reducers/user";


const Header = () => {

const {user, logout} = useAuth();
const {push} = useRouter();

const handleLogout = () => {
  logout();
 toast.success("Vous êtes bien déconnecté.");

  setTimeout(() => {
    push("/login");
  }, 2000);
};
 return (
    <>
    <header className={styles.header}>
        <img className={styles.logo} id="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPT1vqy8OTvtQWrWH4vkSCoe2ZzFokp1CRlQ&s" alt="logo" />
        <p className={styles.slogan}></p>

        <div className={styles.navbar}>
  <nav className={styles.viewer}>
    <Link className={styles.links} href="/">Home</Link>
    <Link className={styles.links} href="/articles">Articles</Link>

    {user ? (
      <>
        <Link href="/" onClick={handleLogout} className={styles.links}>
          Déconnexion
        </Link>
      </>
    ) : (
      <>
        <Link className={styles.links} href="/login">Connexion</Link>
        <Link className={styles.links} href="/register">S'inscrire</Link>
      </>
    )}
  </nav>
</div>

      </header>
    </>
 )
  
}

export default Header;