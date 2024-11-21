import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

    const login = (userData) => {
        localStorage.setItem("token", JSON.stringify(userData.token));
        setUser(userData);
        console.log(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const tokenFromLS = JSON.parse(localStorage.getItem("token"));
            if (!tokenFromLS) {
                setUser(null);
                setLoading(false); // Fin du chargement si aucun token
                return;
            }

            try {
                const res = await axios.get("http://localhost:3002/api/users/check", {
                    headers: { Authorization: `Bearer ${tokenFromLS}` }
                });
                setUser({ ...res.data, token: tokenFromLS });
            } catch (e) {
                setUser(null);
                localStorage.removeItem("token");
            } finally {
                setLoading(false); // Fin du chargement après l'appel
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Création d'un hook personnalisé
export const useAuth = () => useContext(AuthContext);
