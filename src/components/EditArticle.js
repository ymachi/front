import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { token } from "../../context/token";
import { useRouter } from 'next/router';
import styles from '../styles/AddArticle.module.css';

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query; // Utilisez router.query directement

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    imageUrl: '' 
  });

  useEffect(() => {
    // Vérifier si id est défini et est une chaîne non vide
    if (id && typeof id === 'string') {
      const fetchOneArticle = async () => {
        try {
          const res = await axios.get(`http://localhost:3002/api/articles/${id}`, {
            headers: token() // Ajoutez les headers d'authentification
          });
          setInputs(res.data);
        } catch (error) {
          console.error(error);
          toast.error('Erreur lors de la récupération de l\'article');
          router.push('/articles'); // Rediriger en cas d'erreur
        }
      };
      fetchOneArticle();
    }
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, imageUrl } = inputs;

    // Validation des champs
    if (title.trim() === "" || content.trim() === "" || imageUrl.trim() === "") {
      return toast.error("Veuillez remplir tous les champs");
    }

    try {
      const res = await axios.put(
        `http://localhost:3002/api/articles/edit/${id}`, 
        inputs, // Envoyez directement l'objet inputs
        { headers: token() } // Assurez-vous d'ajouter les headers
      );

      toast.success(res.data.message);
      router.push('/articles');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la mise à jour de l\'article');
    }
  };

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
              <textarea
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