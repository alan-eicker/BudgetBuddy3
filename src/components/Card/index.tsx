import React from 'react';
import classnames from 'classnames';
import Box, { BoxProps } from '@mui/material/Box';
import styles from './Card.module.scss';

interface CardProps extends BoxProps {
  isDarkTheme?: boolean;
  head?: string | JSX.Element;
  children: React.ReactNode;
  height?: number | string;
  hasError?: boolean;
}

export default function Card({
  head,
  children,
  height,
  hasError,
  isDarkTheme = false,
  ...boxProps
}: CardProps) {
  return (
    <Box
      className={classnames(styles.container, {
        [styles.hasError]: hasError,
        [styles.darkTheme]: isDarkTheme,
      })}
      height={height}
      width="100%"
      {...boxProps}
    >
      {head && <Box className={styles.head}>{head}</Box>}
      <Box className={styles.body}>{children}</Box>
    </Box>
  );
}
