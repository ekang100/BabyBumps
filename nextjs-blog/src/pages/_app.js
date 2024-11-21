import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/layout.module.css';

const MyApp = ({ Component, pageProps }) => {
  const fixedFooter = Component.fixedFooter === true;

  return (
    <div className={styles.container}>
      <Header />
      <main
        className={styles.main}
        style={{
          paddingTop: '64px',
          paddingBottom: fixedFooter ? '127px' : '0',
        }}
      >
        <Component {...pageProps} />
      </main>
      <Footer fixed={fixedFooter} />
    </div>
  );
}

export default MyApp; 