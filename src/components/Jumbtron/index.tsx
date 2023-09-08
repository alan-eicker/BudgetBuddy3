import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import styles from './Jumbotron.module.scss';

export interface JumbotronProps {
  children: ReactNode;
}

const Jumbotron = ({ children }: JumbotronProps): JSX.Element => {
  return <Box className={styles.container}>{children}</Box>;
};

export default Jumbotron;
