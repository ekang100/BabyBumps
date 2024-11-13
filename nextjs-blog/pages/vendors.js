import { useState } from "react";
import styles from "../styles/Vendors.module.css";

function Vendors() {
  const [vendors, setVendors] = useState([
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
      starred: false, // Initial state for starred
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
      starred: false,
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
      starred: false,
    },
  ]);

  const toggleStar = (id) => {
    setVendors((prevVendors) =>
      prevVendors.map((vendor) =>
        vendor.id === id ? { ...vendor, starred: !vendor.starred } : vendor
      )
    );
  };

  return (
    <div>
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
              <button
                onClick={() => toggleStar(vendor.id)}
                className={styles.starButton}
              >
                {vendor.starred ? "Unstar" : "Star"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Vendors;