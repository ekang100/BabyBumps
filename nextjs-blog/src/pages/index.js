import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./index/home.module.css";
import StandardButton from '../components/buttons/standardButton';

const Home = () => {
  const router = useRouter();

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroTitle}>
            Building Families, One Miracle at a Time
          </h1>
          <p className={styles.heroSubtitle}>
            Connecting intended parents with surrogates to make dreams come
            true.
          </p>
          <StandardButton 
            onClick={() => router.push('/project-management')}
            variant="large"
          >
            Get Started
          </StandardButton>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="/Families All Types 1.svg"
            alt="Happy family"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <div className={styles.serviceCardsContainer}>
          <div className={styles.serviceCard}>
            <Image
              src="/People 4.svg"
              alt="Surrogate Support"
              width={300}
              height={200}
            />
            <h3 className={styles.serviceTitle}>Surrogate Support</h3>
            <p className={styles.serviceDescription}>
              Providing surrogates with the support throughout their
              journey.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <Image
              src="/High Five 1.svg"
              alt="Parent Guidance"
              width={300}
              height={200}
            />
            <h3 className={styles.serviceTitle}>Parent Guidance</h3>
            <p className={styles.serviceDescription}>
              Guiding intended parents through each step to grow their family.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <Image
              src="/Business Deal 3.svg"
              alt="Legal Assistance"
              width={300}
              height={200}
            />
            <h3 className={styles.serviceTitle}>Legal Assistance</h3>
            <p className={styles.serviceDescription}>
              Helping navigate the legal aspects of surrogacy with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Families Say</h2>
        <div className={styles.testimonialCard}>
          <p className={styles.testimonialText}>
            "Baby Bumps made our dream come true. We are forever grateful for
            the love and support throughout our surrogacy journey."
          </p>
          <h4 className={styles.testimonialAuthor}>- Sarah & John</h4>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
        <StandardButton onClick={() => router.push('/forum')}>
          Join the Community
        </StandardButton>
      </section>
    </div>
  );
}

export default Home;