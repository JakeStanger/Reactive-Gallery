import React from "react";
import styles from "./Controls.module.scss";
import IControlsProps from "./IControlsProps";
import Search from "./search/Search";
import GroupBy from "./groupBy/GroupBy";
import Visibility from "./visibility/Visibility";

const Controls: React.FC<IControlsProps> = props => (
  <div className={styles.controls}>
    <Search query={props.query} onChange={props.onQueryChange} />
    <GroupBy group={props.group} onChange={props.onGroupChange} />
    <Visibility 
      showLocation={props.showLocation}
      showTime={props.showTime}
      showDescription={props.showDescription}
      showTags={props.showTags}
      
      onChangeShowLocation={props.onChangeShowLocation}
      onChangeShowTime={props.onChangeShowTime}
      onChangeShowDescription={props.onChangeShowDescription}
      onChangeShowTags={props.onChangeShowTags}
    />
  </div>
);

export default React.memo(Controls);
