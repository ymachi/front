import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';  

const Home = () => {
  const { push } = useRouter();
  const [articles, setArticles] = useState([]);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('http://localhost:3002/api/articles');
        setArticles(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors de la récupération des articles");
      }
    };
    fetchArticles(); 
  }, []);


  return (
    <>
      <main>
        <div className={styles.articleContainer}>
          <article className={styles.introArticles}>
            <h1 className={styles.titleArticles}>Derniers Posts</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.
            </p>
          </article>

          <section className={styles.cardsArticles}>
            {articles.length > 0 ? (
              articles.map((article) => (
                <article key={article._id} className={styles.cardArticls}>
                  <h2 className={styles.titleArticles}>{article.title}</h2>
                  <figure>
                    <img src={article.imageUrl} className={styles.imgResponsive} alt={article.title} />
                    <figcaption>{article.content}</figcaption>
                    <p>Par <strong>{article.creator.username}</strong></p>
                  </figure>
                  {/* <ul>
                    <li>{article.creator.username}</li>
                  </ul> */}
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

export default Home;
