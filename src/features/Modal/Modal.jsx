import styles from './Modal.module.css';
import { useRecipeContext } from '../../RecipeContext';

export default function Modal({ children }) {
  const { state, dispatch } = useRecipeContext();

  const handleModalClose = () =>
    dispatch({ type: 'modalOpen', isModalOpen: false });

  if (!state.isModalOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleModalClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleModalClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
