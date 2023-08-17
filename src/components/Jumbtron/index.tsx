import styles from './Jumbotron.module.scss';

interface JumbotronProps {
  children: JSX.Element;
}

const Jumbotron = ({ children }: JumbotronProps): JSX.Element => {
  return <div className={styles.jumboTronContainer}>{children}</div>;
};

export default Jumbotron;
