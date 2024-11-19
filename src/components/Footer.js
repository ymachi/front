import React, { Fragment } from 'react';
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <>
    <footer className={styles.footer}>
     <article className={styles.linkFooter}>
          <p>Mentions Légales</p>
          
        </article>
        
        <article className={styles.linkFooter}>
          <p>Politique de confidentialité</p>
        </article>
    
        <article className={styles.linkFooter}>
          <p>Politique des cookies</p>
        </article>

        <article className={styles.linkFooter}>
          <p>Conditions d'utilisation</p>
        </article>
        </footer>
        
      
    </>
  )
}

export default Footer
