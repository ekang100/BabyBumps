import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Layout.module.css';

function MyApp({ Component, pageProps }) {
  // Determine if the footer should be fixed based on the page
  const fixedFooter = Component.fixedFooter === true; // Default to false unless specified

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <Footer fixed={fixedFooter} />
    </div>
  );
}

export default MyApp;