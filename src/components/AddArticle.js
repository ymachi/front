import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { token } from "../../context/token";
import { useAuth } from "../../context/AuthContext";  // Importation de votre contexte d'authentification
import styles from '../styles/AddArticle.module.css';
import { useRouter } from 'next/router';

const AddArticle = () => {
  const {push} = useRouter();
  const { user } = useAuth();  // récupère l'utilisateur connecté
  const [inputs, setInputs] = useState({
    title: "",
    imageUrl: "",  
    content: "",
    creator: user ? user._id : "", // met l'ID de l'utilisateur connecté
  });

  const [message, setMessage] = useState("");

  // gestion de l'event pour les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;

    // màj l'état des inputs en fonction du champ modifié
    setInputs({
      ...inputs,
      [name]: value,
    });

    setMessage("");  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, content, imageUrl, creator } = inputs;
      console.log(title, content, imageUrl, creator)
      // securité
      if (!title || title.trim() === "" || !imageUrl || imageUrl.trim() === "" || !content || content.trim() === "" || !creator || creator.trim() === "") {
        return toast('Attention, tous les champs sont requis !', {
          icon: '⚠️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }

      // création du FormData pour envoyer les données au serveur
      const formData = new FormData();
      formData.append("title", title);
      formData.append("imageUrl", imageUrl);
      formData.append("content", content);
      formData.append("creator", creator); 

      // envoi de la requête au serveur
      const res = await axios.post("http://localhost:3002/api/articles/new", {title, imageUrl, content, creator}, { headers: token() });

      setMessage(res.data.message);
      toast.success('Posts bien ajouté ! Vous allez être redirigé');

      setTimeout(() =>{
        push("/articles")
      }, 2000)
    } catch (e) {
      toast.error("Erreur lors de la création de l'article.");
      console.log(e);
    }
  };

  return (
    <>
      <main className={styles.content}>
        <div className={styles.container}>
          <section className="intro">
            <h1>Ajouter un post</h1>
          </section>
          <form className={styles.AddArticle} encType="multipart/form-data" onSubmit={handleSubmit} method="post">
            <div className={styles.parentparts}>
              <section className={styles.partone}>
                <label htmlFor="title">Titre de l'article</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Titre de l'article"
                  onChange={handleChange}
                  value={inputs.title} 
                />

                <label htmlFor="imageUrl">Image</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  onChange={handleChange}
                  value={inputs.imageUrl} 
                />

                <label htmlFor="content">Contenu</label>
                <input
                  type="text"
                  id="content"
                  name="content"
                  placeholder="Contenu de l'article"
                  onChange={handleChange}
                  value={inputs.content} 
                />

                <label htmlFor="creator">Auteur</label>
                <input
                  type="text"
                  id="creator"
                  name="creator"
                  placeholder="Auteur"
                  value={user ? user.username : ""} 
                  disabled
                />
              </section>
            </div>

            <input type="submit" value="Ajouter" />
          </form>
        </div>
      </main>
    </>
  );
};

export default AddArticle;
