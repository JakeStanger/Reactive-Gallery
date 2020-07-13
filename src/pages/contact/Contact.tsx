import React from "react";
import styles from "./Contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faPaypal,
  faFacebook,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import config from "../../config.json";
import css from "../../styles/css";
import TextPreamble from "../../pageContent/contact/TextPreamble";
import TextDescription from "../../pageContent/contact/TextDescription";
import { ReactComponent as IconRedbubble } from "./redbubble.svg";

// const faRedbubble: IconDefinition = {
//   prefix: "fas",
//   iconName: "mycar" as any,
//   icon: [
//     512,
//     512,
//     [],
//     "f0000",
//     iconRedbubble
//   ]
// };
// library.add(faRedbubble);

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
        <a
          href={config.contact.facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} style={{ width: "unset" }} />
          <div className={styles.label}>Facebook</div>
        </a>
      </div>
      <div className={styles.link}>
        <a
          href={config.contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} style={{ width: "unset" }} />
          <div className={styles.label}>Instagram</div>
        </a>
      </div>
      <div className={styles.link}>
        <a
          href={config.contact.paypal}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faPaypal} style={{ width: "unset" }} />
          <div className={styles.label}>PayPal</div>
        </a>
      </div>
      <div className={styles.link}>
        <a
          href={config.contact.redbubble}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconRedbubble
            style={{
              width: "unset",
              overflow: "visible",
              display: "inline-block",
              fontSize: 'inherit',
              height: '1em'
            }}
          />
          <div className={styles.label}>Redbubble</div>
        </a>
      </div>
    </div>
    <div className={styles.text}>
      <TextPreamble />
    </div>
    <div className={css(styles.text, styles.biography)}>
      <TextDescription />
    </div>
  </div>
);

export default Contact;
