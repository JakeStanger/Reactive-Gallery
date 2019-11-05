import React from "react";
import styles from "./Search.module.scss";
import ISearchProps from "./ISearchProps";

const Search: React.FC<ISearchProps> = ({ query, onChange }) => (
  <div className={styles.search}>
    <input placeholder="Search" value={query} onChange={ev => onChange(ev.target.value)} />
  </div>
);

export default React.memo(Search);
