import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { token } from "../../context/token";
import { useAuth } from "../../context/AuthContext";
import toast from 'react-hot-toast';

const Articles = () => {
  const { push, query } = useRouter();
  const { user, loading } = useAuth(); 
  const [articles, setArticles] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('http://localhost:3002/api/articles');
        setArticles(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors de la récupération des articles");
      }
    };
    fetchArticles();
  }, [isDeleted]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
    if (confirmDelete) {
      try {
        const res = await axios.delete(`http://localhost:3002/api/articles/delete/${id}`, { headers: token() });
        setIsDeleted(!isDeleted);
        toast.success(res.data.message);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la suppression de l'article.");
      }
    }
  };

  // si l'utilisateur est en train de charger les données
  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <main>
        <div className={styles.articleContainer}>
          <article className={styles.introArticles}>
            <h1 className={styles.titleArticles}>Posts</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.
            </p>
          </article>

          {user && (
            <Link className={styles.editButton} href='/addarticle'>Ajouter un post</Link>
          )}

          <section className={styles.cardsArticles}>
            {articles.length > 0 ? (
              articles.map((article) => (
                <article key={article._id} className={styles.cardArticls}>
                  <h2 className={styles.titleArticles}>{article.title}</h2>
                  <figure>
                    <img src={article.imageUrl} className="img-responsive" alt={article.title} />
                    <figcaption>{article.content}</figcaption>
                    <p> Par <strong>{article.creator.username}</strong></p>
                  </figure>
                  
                  {user && user._id === article.creator._id && ( // vérifie si l'utilisateur est le créateur
                    <div className={styles.cardActions}>
                      <button
                        className={styles.editButton}
                        onClick={() => push(`/editarticle/${article._id}`)} 
                      >
                        Éditer
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(article._id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </article>
              ))
            ) : (
              <p>Aucun article trouvé</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Articles;
