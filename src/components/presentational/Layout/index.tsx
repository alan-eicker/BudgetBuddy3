import { useRouter } from 'next/router';
import styles from './Layout.module.scss';

export interface LayoutProps {
  header: JSX.Element;
  children: JSX.Element;
}

const Layout = ({ header, children }: LayoutProps): JSX.Element => {
  const { pathname } = useRouter();

  return (
    <div className={styles.layoutContainer}>
      {pathname !== '/' && header}
      <main className={styles.layoutMain}>{children}</main>
    </div>
  );
};

export default Layout;
