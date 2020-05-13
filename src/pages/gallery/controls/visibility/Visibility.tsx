import React, { useState } from "react";
import styles from "./Visibility.module.scss";
import IVisibilityProps from "./IVisibilityProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../../../components/checkbox/Checkbox";

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
          <Checkbox
            checked={props.showLocation}
            onChange={props.onChangeShowLocation}
            label={"Show location"}
          />
          <Checkbox
            checked={props.showTime}
            onChange={props.onChangeShowTime}
            label={"Show time"}
          />
          <Checkbox
            checked={props.showDescription}
            onChange={props.onChangeShowDescription}
            label={"Show description"}
          />
          <Checkbox
            checked={props.showTags}
            onChange={props.onChangeShowTags}
            label={"Show tags"}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(Visibility);
