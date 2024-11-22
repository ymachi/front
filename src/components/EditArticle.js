import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { token } from "../../context/token"; // Assurez-vous que ce chemin est correct
import { useRouter } from 'next/router';
import styles from '../styles/AddArticle.module.css';

const EditArticle = () => {
    const { query, push } = useRouter();
    const { id } = query;

    const [inputs, setInputs] = useState({
        content: "",
        title: "",
        imageUrl: ""
    });

    useEffect(() => {
        if (!id) return;

        const fetchOneArticle = async () => {
            try {
                const res = await axios.get(`http://localhost:3002/api/articles/${id}`, { headers: token() });
                setInputs(res.data);
            } catch (e) {
                toast.error("Erreur lors de la récupération de l'article.");
            }
        };

        fetchOneArticle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, content, imageUrl } = inputs;

        if (title.trim() === "" || content.trim() === "" || imageUrl.trim() === "") {
            return toast.error("Veuillez remplir les champs.");
        }

        try {
            await axios.put(
                `http://localhost:3002/api/articles/edit/${id}`,
                { title, content, imageUrl },
                { headers: token() }
            );
            toast.success("Article mis à jour avec succès !");
            push("/articles");
        } catch (e) {
            console.error("Erreur lors de la mise à jour : ", e.response?.data || e.message);
            toast.error("Erreur lors de la mise à jour de l'article.");
        }
    };

    return (
        <main className={styles.content}>
            <div className={styles.container}>
                <section className="intro">
                    <h1>Éditer un article</h1>
                </section>
                <form className={styles.AddArticle} onSubmit={handleSubmit}>
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
