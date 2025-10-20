import styles from './Modal.module.css';
import { useRecipeContext } from '../../context/RecipeContext';

export default function Modal({ children }) {
  const { state, dispatch } = useRecipeContext();

  const handleModalClose = () =>
    dispatch({ type: 'modalOpen', isModalOpen: false });

  if (!state.isModalOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleModalClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
