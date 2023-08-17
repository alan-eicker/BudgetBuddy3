import styles from './jumbotron.module.scss';

interface JumbotronProps {
  children: JSX.Element;
}

const Jumbotron = ({ children }: JumbotronProps): JSX.Element => {
  return <div className={styles.container}>{children}</div>;
};

export default Jumbotron;
