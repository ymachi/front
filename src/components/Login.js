import React, { useState } from 'react';
import styles from "../styles/Login.module.css";
import Link from 'next/link';
import axios from 'axios'
import toast ,{ Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: ""
  })
  
  // hook qui permet de récupérer le context
  
  const auth = useAuth();
  
  const {push} = useRouter();
  
 const handleChange = (e) => {
   
  const {name, value} = e.target;
  
  setFormInput({...formInput, [name]: value})
 
}

 const handleSubmit = async (e) => {
   
   e.preventDefault();
   
   try {
     
      const res = await axios.post("http://localhost:3002/api/users/login", formInput)
     
    toast.success("Vous êtes bien connecté, vous allez être redirigé.")
     
     auth.login(res.data)
     
     setTimeout(() =>{
       push("/")
     }, 2000)
     
   } catch (e) {
     
    toast.error(e.response?.data?.message || 'Une erreur est survenue.');
    console.log(e);
   }
 }
 
 
//   const handleLogout = () => {
//    logout();
//    toast.success("Vous êtes bien déconnecté.");
//    navigate("/");
//  };
  
  

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
              value={formInput.email}
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
              value={formInput.password}
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
  );
}

export default Login;
