import React from 'react';
import styles from './index.module.css';

const Pagination = ({ perPage, total, paginate, currentPage }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
        pageNumbers.push(i)
    }
    const handleClick = number => e => {
        e.preventDefault();
        paginate(number);
    }

    return (
        <div className={styles.paginationBlock}>
            <ul className={styles.paginationList}>
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number && styles.selectedPage} onClick={handleClick(number)}>
                        {number}
                    </li>
                ))}
            </ul>
        </div >

    )
}
export default Pagination;