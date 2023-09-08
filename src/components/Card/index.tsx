import React from 'react';
import classnames from 'classnames';
import Box, { BoxProps } from '@mui/material/Box';
import styles from './Card.module.scss';

interface CardProps extends BoxProps {
  head?: string | JSX.Element;
  children: React.ReactNode;
  height?: number | string;
  hasError?: boolean;
}

const Card = ({ head, children, height, hasError, ...boxProps }: CardProps) => (
  <Box
    className={classnames(styles.container, {
      [styles.hasError]: hasError,
    })}
    height={height}
    width="100%"
    {...boxProps}
  >
    {head && <Box className={styles.head}>{head}</Box>}
    <Box className={styles.body}>{children}</Box>
  </Box>
);

export default Card;
