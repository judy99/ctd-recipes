import styles from '../App.module.css';

export default function About() {
  return (
    <>
      <p className={styles.aboutText}>
        This application is a lightweight tool designed to help users manage
        their recipes. It allows users to do the following:
      </p>
      <ul>
        <li className={styles.aboutItem}>
          <span>Add Recipe:</span> users can add new recipe with a title, image,
          ingredients, and cooking instructions.
        </li>
        <li className={styles.aboutItem}>
          <span>Edit Recipe:</span> users can update existing recipes to correct
          or change their details.
        </li>
        <li className={styles.aboutItem}>
          <span>Search</span> by recipe title.
        </li>

        <li className={styles.aboutItem}>
          <span>Filter</span> by recipe type (e.g lunch, breakfast, etc.)
        </li>
        <li className={styles.aboutItem}>
          <span>Alpabetical sort</span> by recipe title and <span>sort</span> by
          time created.
        </li>
      </ul>
    </>
  );
}
