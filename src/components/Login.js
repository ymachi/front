import React from 'react'
import styles from "../styles/Login.module.css"
import Link from 'next/link'




const handleChange = () => {
}
const handleSubmit = () => {
}

const Login = () => {
  return (
    <main>
    <div className={styles.loginContainer}>
      <section className={styles.introLogin}>
        <h1 className={styles.titleLogin}>Se connecter</h1>
      </section>
      <form className={styles.login} onSubmit={handleSubmit}>
        <section>
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="password">Mot de passe : </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
          />
        </section>
        <input type="submit" value="Se connecter" />
      </form>
      <section>
        <p>Mot de passe oublié ? <Link href="/reset-password">Réinitialiser ici</Link></p>
        <p>Pas encore inscrit ? <Link href="/register">S'inscrire ici</Link></p>
      </section>
    </div>
  </main>
  )
}

export default Login
