import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  head: string | JSX.Element;
  children: React.ReactNode;
  height?: number | string;
}

const Card = ({ head, children, height }: CardProps) => (
  <div className={styles.container} style={{ height }}>
    <div className={styles.head}>{head}</div>
    <div className={styles.body}>{children}</div>
  </div>
);

export default Card;
