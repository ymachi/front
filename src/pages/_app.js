import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
  reducer: { },
});

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Header />
      <Component {...pageProps} />

      <Footer/>
    </Provider>
  );
}

export default App;