import React, { useState } from "react";
import styles from "./Visibility.module.scss";
import IVisibilityProps from "./IVisibilityProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Visibility: React.FC<IVisibilityProps> = props => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.visibility}>
      <button className={styles.moreBtn} onClick={() => setExpanded(!expanded)}>
        {!expanded ? (
          <div className={styles.label}>
            <div>More</div>
            <FontAwesomeIcon className={styles.arrow} icon={faChevronRight} />
          </div>
        ) : (
          <div className={styles.label}>
            <div>Less</div>
            <FontAwesomeIcon className={styles.arrow} icon={faChevronLeft} />
          </div>
        )}
      </button>
      {expanded && (
        <div className={styles.more}> 
          <div className={styles.checkboxContainer}>
            <label>
              Show location
              <input
                type="checkbox"
                checked={props.showLocation}
                onChange={ev => props.onChangeShowLocation(ev.target.checked)}
              />
              <span className={styles.checkbox} />
            </label>
          </div>
          <div className={styles.checkboxContainer}>
            <label>
              Show time
              <input
                type="checkbox"
                checked={props.showTime}
                onChange={ev => props.onChangeShowTime(ev.target.checked)}
              />
              <span className={styles.checkbox} />
            </label>
          </div>
          <div className={styles.checkboxContainer}>
            <label>
              Show description
              <input
                type="checkbox"
                checked={props.showDescription}
                onChange={ev => props.onChangeShowDescription(ev.target.checked)}
              />
              <span className={styles.checkbox} />
            </label>
          </div>
          <div className={styles.checkboxContainer}>
            <label>
              Show tags
              <input
                type="checkbox"
                checked={props.showTags}
                onChange={ev => props.onChangeShowTags(ev.target.checked)}
              />
              <span className={styles.checkbox} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Visibility);
