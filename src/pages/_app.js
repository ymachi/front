import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {AuthProvider} from "../../context/AuthContext";


const store = configureStore({
  reducer: { },
});

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
      <Head>
        <title>Blog 2.0</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    <Toaster/>
      <Footer/>
      </AuthProvider>
    </Provider>
  );
}

export default App;