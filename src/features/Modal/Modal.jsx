import styles from './Modal.module.css';

export default function Modal({
  children,
  isModalOpen,
  recipesActions,
  dispatch,
}) {
  const handleModalClose = () =>
    dispatch({ type: recipesActions.modalOpen, isModalOpen: false });

  if (!isModalOpen) return null;

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
