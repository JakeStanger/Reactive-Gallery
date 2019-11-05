import React from "react";
import styles from "./Contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPaypal, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import config from "../../../config.json";

const Contact: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.title}>Contact</div>
    <div className={styles.links}>
      <div className={styles.link}>
        <a href={`mailto:${config.contact.email}`}>
          <FontAwesomeIcon icon={faEnvelope} style={{ width: "unset" }} />
          <div className={styles.label}>Email</div>
        </a>
      </div>
      <div className={styles.link}>
        <a href={config.contact.facebook} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} style={{ width: "unset" }} />
          <div className={styles.label}>Facebook</div>
        </a>
      </div>
      <div className={styles.link}>
        <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} style={{ width: "unset" }} />
          <div className={styles.label}>Instagram</div>
        </a>
      </div>
      <div className={styles.link}>
        <a href={config.contact.paypal} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faPaypal} style={{ width: "unset" }} />
          <div className={styles.label}>PayPal</div>
        </a>
      </div>
    </div>
  </div>
);

export default Contact;
