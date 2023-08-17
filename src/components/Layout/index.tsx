import { useRouter } from 'next/router';
import styles from './layout.module.scss';

interface LayoutProps {
  header: JSX.Element;
  children: JSX.Element;
}

const Layout = ({ header, children }: LayoutProps): JSX.Element => {
  const { pathname } = useRouter();

  return (
    <div className={styles.container}>
      {pathname !== '/' && header}
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Layout;
