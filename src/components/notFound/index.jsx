import React from 'react';
import pageNotFound from './pageNotFound.png';
import styles from './index.module.css';


export default function PageNotFound() {
    return (
        <div className={styles.wraper}>
            <img src={pageNotFound} className={styles.notf} alt="" />
        </div>

    );
};


