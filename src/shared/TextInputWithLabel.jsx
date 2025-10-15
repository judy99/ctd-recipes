import styles from './textInputWithLabel.module.css';
function TextInputWithLabel({
  elementId,
  labelText = '',
  onChange,
  ref,
  value,
  placeholder,
  error,
}) {
  return (
    <div className={styles.textInputWithLabel}>
      <label htmlFor={elementId} className={labelText.length && styles.label}>
        {labelText}
      </label>
      <input
        className={`${styles.inputText} ${error && styles.error} `}
        type="text"
        id={elementId}
        onChange={onChange}
        value={value}
        ref={ref}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInputWithLabel;
