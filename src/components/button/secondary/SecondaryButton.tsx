import React from 'react';
import styles from '../Button.module.scss';
import ISecondaryButtonProps from './ISecondaryButtonProps';

const SecondaryButton: React.FC<ISecondaryButtonProps> = ({onClick, disabled, text}) => {
  return (
    <button className={`${styles.button}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default SecondaryButton;
