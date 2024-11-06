import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Vendors.module.css";

export default function Vendors() {
  const [vendors] = useState([
    {
      id: 1,
      name: "Fertility Center West",
      type: "Fertility Clinic",
      location: "San Francisco, CA",
      description: "Leading fertility center with over 20 years of experience",
      contact: {
        phone: "(555) 123-4567",
        email: "info@fcwest.com",
      },
    },
    {
      id: 2,
      name: "Family Law Partners",
      type: "Legal Services",
      location: "Los Angeles, CA",
      description: "Specialized in surrogacy and family formation law",
      contact: {
        phone: "(555) 987-6543",
        email: "contact@familylawpartners.com",
      },
    },
    {
      id: 3,
      name: "Surrogacy Support Group",
      type: "Support Services",
      location: "Online / National",
      description:
        "Professional counseling and support services for intended parents",
      contact: {
        phone: "(555) 456-7890",
        email: "hello@surrogacysupport.com",
      },
    },
  ]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link legacyBehavior href="/">
            <a className={styles.logo}>Baby Bumps</a>
          </Link>
        </div>
        <nav className={styles.navbar}>
          <Link href="/about">About Us</Link>
          <Link href="/surrogates">Find a Surrogate</Link>
          <Link href="/forum">Forum</Link>
          <Link href="/vendors">Vendors</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>Trusted Vendors</h1>
        <p className={styles.description}>
          Connect with our network of verified surrogacy and fertility
          professionals
        </p>

        <div className={styles.vendorGrid}>
          {vendors.map((vendor) => (
            <div key={vendor.id} className={styles.vendorCard}>
              <h2>{vendor.name}</h2>
              <div className={styles.vendorType}>{vendor.type}</div>
              <div className={styles.vendorLocation}>{vendor.location}</div>
              <p className={styles.vendorDescription}>{vendor.description}</p>
              <div className={styles.contactInfo}>
                <h3>Contact Information</h3>
                <p>Phone: {vendor.contact.phone}</p>
                <p>Email: {vendor.contact.email}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <p>Baby Bumps © 2024. All rights reserved.</p>
      </footer>
    </div>
  );
}
