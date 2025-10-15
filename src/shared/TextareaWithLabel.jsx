import styles from './TextareaWithLabel.module.css';
function TextareaWithLabel({
  elementId,
  labelText = '',
  onChange,
  ref,
  value,
  placeholder,
  error,
}) {
  const MAX_LENGTH = 1000; // Define your character limit
  return (
    <div className={styles.textareaWithLabel}>
      <label htmlFor={elementId}>{labelText}</label>
      <textarea
        className={`${styles.textarea} ${error && styles.error} `}
        id={elementId}
        maxLength={MAX_LENGTH}
        onChange={onChange}
        value={value}
        ref={ref}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextareaWithLabel;
