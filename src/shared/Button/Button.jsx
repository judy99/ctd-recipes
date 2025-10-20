import styles from './Button.module.css';

export default function Button({ title, onClickHandler, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={styles.regBtn}
      onClick={onClickHandler}
    >
      {title}
    </button>
  );
}
