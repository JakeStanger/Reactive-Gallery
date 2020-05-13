import React from "react";
import styles from "./Controls.module.scss";
import IControlsProps from "./IControlsProps";
import Visibility from "./visibility/Visibility";
import TextField from "../../../components/textField/TextField";
import Dropdown from "../../../components/dropdown/Dropdown";

const Controls: React.FC<IControlsProps> = props => (
  <div className={styles.controls}>
    <TextField
      value={props.query}
      onChange={props.onQueryChange}
      placeholder={"Search"}
    />
    <Dropdown
      value={props.group}
      onChange={props.onGroupChange}
      placeholder={'Group By'}
      options={[
        { key: "", value: "Group By" },
        { key: "taken_time", value: "Date" },
        { key: 'name', value: 'Name'},
        { key: 'location', value: 'Location'}
      ]}
    />
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
