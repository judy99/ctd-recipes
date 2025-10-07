import styles from './CategoryBadge.module.css';

export default function CategoryBadge({ category }) {
  return (
    <span className={`${styles.category} ${styles[category]}`}>{category}</span>
  );
}
