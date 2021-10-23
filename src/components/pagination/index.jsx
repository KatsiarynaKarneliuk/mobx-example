import React from 'react';
import styles from './index.module.css';

const Pagination = ({ perPage, total, paginate }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className={styles.pagination}>
                {pageNumbers.map(number => (
                    <li key={number} className={styles.pageItem}>
                        <a href="!#" onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div >

    )
}
export default Pagination;