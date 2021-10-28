import React from 'react';
import pageNotFound from './pageNotFound.png';
import styles from './index.module.scss';


export default function PageNotFound() {
    return (
        <div className={styles.wrapper}>
            <img src={pageNotFound} className={styles.notf} alt="" />
        </div>

    );
};


