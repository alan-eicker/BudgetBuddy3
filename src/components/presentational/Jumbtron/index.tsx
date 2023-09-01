import { ReactNode } from 'react';
import styles from './Jumbotron.module.scss';

export interface JumbotronProps {
  children: ReactNode;
}

const Jumbotron = ({ children }: JumbotronProps): JSX.Element => {
  return <div className={styles.container}>{children}</div>;
};

export default Jumbotron;
