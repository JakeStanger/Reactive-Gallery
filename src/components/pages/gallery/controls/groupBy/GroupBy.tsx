import React from "react";
import styles from "./GroupBy.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import IGroupByProps from "./IGroupByProps";

const GroupBy: React.FC<IGroupByProps> = ({group, onChange}) => (
  <div className={styles.groupBy}>
    <select
      id="groupBy"
      name="mode"
      value={group}
      onChange={ev => onChange(ev.target.value)}
      placeholder="Group By"
    >
      <option value="">Group By</option>
      <option value="taken_time">Date</option>
      <option value="name">Name</option>
      <option value="location">Location</option>
    </select>
    <FontAwesomeIcon className={styles.arrow} icon={faChevronDown} />
  </div>
);

export default GroupBy;
