import { memo } from 'react';
import styles from './inputLabel.module.css';

const InputLabel = ({ type, id, labelText, handleChange }) => {
  return (
    <div className={styles.ContainerInput}>
      <input type={type} id={id} required onChange={handleChange}/>
      <label htmlFor={id} className={styles.InputLabel}>
        {labelText}
      </label>
    </div>
  );
};

export default memo(InputLabel);