import React from 'react';
import classnames from 'classnames';
import styles from './Card.module.scss';

interface CardProps {
  head: string | JSX.Element;
  children: React.ReactNode;
  height?: number | string;
  hasError?: boolean;
}

const Card = ({ head, children, height, hasError }: CardProps) => (
  <div
    className={classnames(styles.container, {
      [styles.hasError]: hasError,
    })}
    style={{ height }}
  >
    <div className={styles.head}>{head}</div>
    <div className={styles.body}>{children}</div>
  </div>
);

export default Card;
