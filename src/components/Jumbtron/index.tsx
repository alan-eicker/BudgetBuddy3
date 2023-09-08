import { ReactNode } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import styles from './Jumbotron.module.scss';

export interface JumbotronProps extends BoxProps {
  children: ReactNode;
}

const Jumbotron = ({ children, ...boxProps }: JumbotronProps): JSX.Element => {
  return (
    <Box className={styles.container} {...boxProps}>
      {children}
    </Box>
  );
};

export default Jumbotron;
