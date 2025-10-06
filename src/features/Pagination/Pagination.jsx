// TODO
import Button from '../../shared/Button';
import styles from './Pagination.module.css';

export default function Pagination({
  setSearchParams,
  totalPages,
  currentPage,
}) {
  const handleNextPage = () => {
    if (currentPage + 1 <= totalPages) {
      setSearchParams({
        page: currentPage + 1,
      });
    } else {
      setSearchParams({
        page: totalPages,
      });
    }
  };
  const handlePreviousPage = () => {
    if (currentPage - 1 >= 1) {
      setSearchParams({
        page: currentPage - 1,
      });
    } else {
      setSearchParams({
        page: 1,
      });
    }
  };

  return (
    <div className={styles.paginationControls}>
      <Button title="Previous" />
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button title="Next" />
    </div>
  );
}
