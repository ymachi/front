import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { token } from "../../context/token";
import { useRouter } from 'next/router';
import styles from '../styles/AddArticle.module.css';

const EditArticle = () => {

    const {id} = useParams();
    const {push} = useRouter();

    const [inputs, setInputs] = useState({
      content : "",
      title: "",
      imageUrl: ""
    });

    const [message, setMessage] = useState("");
     
    useEffect(() => {
      const fetchOneArticle = async () => {
         try {
            const res = await axios.get(`http://localhost:3002/api/articles/${id}`);
            setInputs(res.data);
         } catch (e) {
            toast.error("Erreur lors de la récupération de l'article.");
         }
      };

      fetchOneBox();
   }, [id]);

  return (
    <main className={styles.content}>
      <div className={styles.container}>
        <section className="intro">
          <h1>Éditer un article</h1>
        </section>
        <form 
          className={styles.AddArticle} 
          onSubmit={handleSubmit}
        >
          <div className={styles.parentparts}>
            <section className={styles.partone}>
              <label htmlFor="title">Titre de l'article</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Titre de l'article"
                value={inputs.title}
                onChange={handleChange}
              />
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                placeholder="URL de l'image"
                value={inputs.imageUrl}
                onChange={handleChange}
              />
              <label htmlFor="content">Contenu</label>
              <input
                id="content"
                name="content"
                placeholder="Contenu de l'article"
                value={inputs.content}
                onChange={handleChange}
                rows="6"
              />
            </section>
          </div>
          <button type="submit" className={styles.submitButton}>
            Mettre à jour
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditArticle;