import styles from './Button.module.css';

export default function Button({ title, onClickHandler }) {
  return (
    <button type="button" className={styles.regBtn} onClick={onClickHandler}>
      {title}
    </button>
  );
}
