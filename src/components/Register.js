import React from 'react';
import Link from 'next/link';
import { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/Register.module.css"


const Register = () => {


    const [formInput, setFormInput] = useState({
        username: "",
        email: "",
        password: ""
      });
    
      const [checkPwd, setCheckPwd] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        specialChar: false
      })
    
      const [isCompleted, setIsCompleted] = useState(true);
      const {push} = useRouter();
      
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormInput({ ...formInput, [name]: value })
    
        setFormInput(prev => ({ ...prev, [name]: value }))
    
        isNotFullCompleted()
    
        // validation pour le mdp
        if (name === "password") {
          const minLength = value.length >= 8; // Renvoie un true et false
          const uppercase = /[A-Z]/.test(value);
          const lowercase = /[a-z]/.test(value);
          const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)
    
          return setCheckPwd({
            minLength,
            uppercase,
            lowercase,
            specialChar,
            isFocus: true
          })
        }
    
        setCheckPwd(prev => ({ ...prev, isFocus: false }))
      }
    
      const handleSubmit = async(e) => {
        e.preventDefault();
         
         
        try {
          
          const {username, email, password} = formInput
          // sécurité 
            if(username.trim() === ""
            || email.trim() === "" 
            || password.trim() === ""){
               return toast.warning("Veuillez remplir tous les champs.")
            }
          const res = await axios.post("http://localhost:3002/api/users/register", formInput)
          toast.success(res.data.message)
          toast.success("Vous allez être redirigé vers la page de connexion.");
          setTimeout(() => {
            push("/login");
        }, 2000);
    
        }
        catch (e) {
          // pour afficher le message d'erreur venant du back
          toast.error(e.response?.data?.message || 'Une erreur est survenue.');
          console.log(e.response ? e.response.data : e);
        }
      }
    
      const renderValidation = (isValid) => (
        isValid ? <span className="green">✅</span> : <span className="red"> ❌ </span>
      )
    
      const isNotFullCompleted = () => {
        const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/
        if (!checkPwd.test(formInput.password)) {
          return setIsCompleted(true)
        }
        return setIsCompleted(false)
      }
  return (
   <>
    <main>
      <div className={styles.registerContainer}>
        <section className={styles.intro}>
          <h1 className={styles.titleInscription}>S'inscrire</h1>
        </section>
        <form className={styles.register} onSubmit={handleSubmit} method="post">
          <div className={styles.parentsRegister}>
            <section className={styles.parttwoRegister}>
            <label htmlFor="username"> Pseudo : </label>
            <input type="text" id="username" name="username" placeholder="Pseudo" onChange={handleChange} />
              <label htmlFor="email">Email : </label>
              <input type="email" id="email" name="email" placeholder="Email" onChange={handleChange} value={formInput.email} />
              <label htmlFor="password">Mot de passe : </label>
              <input type="password" id="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
              
              {checkPwd.isFocus && 
              <section className="verif"> 
                <p className="text-white"> {renderValidation(checkPwd.minLength)} Au moins 8 caractères  </p>
                <p className="text-white"> {renderValidation(checkPwd.uppercase)} Au moins 1 majuscule  </p>
                <p className="text-white"> {renderValidation(checkPwd.lowercase)} Au moins 1 minuscule  </p>
                <p className="text-white"> {renderValidation(checkPwd.specialChar)} Au moins 1 caractère spécial  </p>
              </section>
              }
              
            </section>
          </div>
          <input type="submit" value="S'inscrire" />
        </form>
        <section>
          <p>Se connecter ? <Link href="/login">Appuyer ici</Link></p>
          <p>Mot de passe oublié ? <Link href="/reset-password">Réinitialiser ici</Link></p>
        </section>
      </div>
    </main>
   </>
  )
}

export default Register
