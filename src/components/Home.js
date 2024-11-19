import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'




const Home = () => {
  const [articles, setArticles] = useState([]);
  
  
  
  return (
    <>
      <main>
     
        <div className={styles.articleContainer}>
        
          <article className={styles.introArticles}>
            <h1 className={styles.titleArticles}>Articles</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.
            </p>
          </article>
          <section className={styles.cardsArticles}>
        
              <article className={styles.cardArticls }>
                <h2 className={styles.titleArticles}></h2>
                <figure>
                  <img src=""className="img-responsive" />
                  <figcaption></figcaption>
                </figure>
                <ul>
                  <li></li>
                  <li></li>
                </ul>
                <div className={styles.cardActions}>
                  <button
                   
                    className={styles.editButton}
                  >
                    Éditer
                  </button>
                  <button

                    className={styles.deleteButton}
                  >
                    Supprimer
                  </button>
                </div>
              </article>
          
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;