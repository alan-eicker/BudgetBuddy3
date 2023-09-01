import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  head: string | JSX.Element;
  children: React.ReactNode;
}

const Card = ({ head, children }: CardProps) => (
  <div className={styles.container}>
    <div className={styles.head}>{head}</div>
    <div className={styles.body}>{children}</div>
  </div>
);

export default Card;
