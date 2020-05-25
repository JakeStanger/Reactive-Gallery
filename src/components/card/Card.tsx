import React from "react";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faClock,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import ICardProps from "./ICardProps";
import LazyLoad from "react-lazyload";
import css from "../../styles/css";

const Card: React.FC<ICardProps> = ({
  image,
  imageService,
  showDescription,
  showLocation,
  showTags,
  showTime,
  showPriceInfo,
  basketItem,
  onDelete,
  height,
  query
}) => {
  // TODO: Fix going back reloading gallery, not saving scroll state
  // TODO: Fix editing location CSS
  return (
    <div className={styles.card} id={`card-${image.id}`}>
      <Link to={`/preview/${image.id}`}>
        <LazyLoad height={height} offset={300} once={true} resize={true}>
          <div>
            <img
              className={styles.image}
              src={imageService.getLink(image)}
              alt={image.name}
              height={height}
            />
          </div>
        </LazyLoad>
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
        {showPriceInfo && basketItem && (
          <div className={styles.priceInfo}>
            <div>Size: {basketItem.price.name}</div>
            <div>Framed: {basketItem.framed ? "Yes" : "No"}</div>
            <div>
              Price: £
              {(basketItem.framed
                ? basketItem.price.framed
                : basketItem.price.unframed) * basketItem.quantity}
            </div>
            <div>Quantity: {basketItem.quantity}</div>
          </div>
        )}
        {showTags && image.tags && (
          <div className={styles.tags}>
            {image.tags.map(tag => (
              <Link
                key={tag.id}
                className={css(
                  styles.tag,
                  query === tag.name && styles.selected
                )}
                to={{
                  pathname: "/",
                  search: `q=${tag.name}`
                }}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
        {showPriceInfo && basketItem && (
          <div className={styles.controls}>
            {onDelete && (
              <div
                className={styles.button}
                onClick={() => onDelete(basketItem)}
              >
                <FontAwesomeIcon icon={faTrash} />
                <span>Delete</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
