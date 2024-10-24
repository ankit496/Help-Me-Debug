"use client"
import styles from './ShootingStar.module.css';
import { useEffect } from 'react';
export default function ShootingStar() {
  useEffect(() => {
  }, []);
  return (
    <div className='w-full h-full'>
    <section className={styles.section}>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      {/* Add more stars as needed */}
    </section>
    </div>
  );
}
