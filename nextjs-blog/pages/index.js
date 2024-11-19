import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

function Home() {
  return (
<<<<<<< HEAD
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src="/logo.png" alt="Baby Bumps Logo" width={150} height={50} />
        </div>
        <nav className={styles.navbar}>
          <Link href="/about">About Us</Link>
          <Link href="/surrogates">Find a Surrogate</Link>
          <Link href="/forum">Forum</Link>
          <Link href="/contact">Contact</Link>
          {/* <Link href="/processmap">Process Map</Link> */}
          <Link href="/updatedpm">To Do!</Link>
        </nav>
      </header>
=======
    <div>
>>>>>>> main
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
          <Link className={styles.heroButton} href="/get-started">
            Get Started
          </Link>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="/hero-image.jpg"
            alt="Happy family"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <h2>Our Services</h2>
        <div className={styles.serviceCardsContainer}>
          <div className={styles.serviceCard}>
            <Image
              src="/service1.jpg"
              alt="Surrogate Support"
              width={300}
              height={200}
            />
            <h3>Surrogate Support</h3>
            <p>
              Providing surrogates with comprehensive support throughout their
              journey.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <Image
              src="/service2.jpg"
              alt="Parent Guidance"
              width={300}
              height={200}
            />
            <h3>Parent Guidance</h3>
            <p>
              Guiding intended parents through each step to grow their family.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <Image
              src="/service3.jpg"
              alt="Legal Assistance"
              width={300}
              height={200}
            />
            <h3>Legal Assistance</h3>
            <p>Helping navigate the legal aspects of surrogacy with ease.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <h2>What Our Families Say</h2>
        <div className={styles.testimonialCard}>
          <p>
            "Baby Bumps made our dream come true. We are forever grateful for
            the love and support throughout our surrogacy journey."
          </p>
          <h4>- Sarah & John</h4>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to Start Your Journey?</h2>
        <Link href="/contact">Contact Us Today</Link>
      </section>
    </div>
  );
}

export default Home;
