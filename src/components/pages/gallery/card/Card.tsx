import React from "react";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faClock } from "@fortawesome/free-solid-svg-icons";
import ICardProps from "./ICardProps";

const Card: React.FC<ICardProps> = ({
  image,
  imageService,
  showDescription,
  showLocation,
  showTags,
  showTime
}) => (
  <div className={styles.card} id={`card-${image.filename}`}>
    <Link to={`/preview/${image.filename}`}>
      <img className={styles.image} src={imageService.getLink(image)} alt={image.name} height={image.height} />
    </Link>

    <div className={styles.info}>
      <div className={styles.title}>{image.name}</div>
      {showLocation && image.location && (
        <div className={styles.infoTag}>
          <FontAwesomeIcon icon={faMapMarker} />
          {image.location.name}
        </div>
      )}
      {showTime && image.timeTaken && (
        <div className={styles.infoTag}>
          <FontAwesomeIcon icon={faClock} />
          {DateTime.fromISO(image.timeTaken).toFormat("dd/MM/yyyy HH:mm")}
        </div>
      )}
      {showDescription && image.description && (
        <div className={styles.description}>{image.description}</div>
      )}
      {showTags && image.tags && (
        <div className={styles.tags}>
          {image.tags.map(tag => (
            <div key={tag.id} className={styles.tag}>
              {tag.name}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default React.memo(Card);
