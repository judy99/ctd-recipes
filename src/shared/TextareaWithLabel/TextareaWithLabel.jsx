import styles from './TextareaWithLabel.module.css';
import { MAX_LENGTH_TEXT } from '../constants';

function TextareaWithLabel({
  elementId,
  labelText = '',
  onChange,
  ref,
  value,
  placeholder,
  error,
}) {
  return (
    <div className={styles.textareaWithLabel}>
      <label htmlFor={elementId}>{labelText}</label>
      <textarea
        className={`${styles.textarea} ${error && styles.error} `}
        id={elementId}
        maxLength={MAX_LENGTH_TEXT}
        onChange={onChange}
        value={value}
        ref={ref}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextareaWithLabel;
