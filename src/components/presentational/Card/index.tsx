import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  head: string | JSX.Element;
  children: React.ReactNode;
}

const Card = ({ head, children }: CardProps) => (
  <div className={styles.card}>
    <div className={styles.cardHead}>{head}</div>
    <div className={styles.cardBody}>{children}</div>
  </div>
);

export default Card;
