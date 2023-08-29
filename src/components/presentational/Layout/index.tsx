import { useRouter } from 'next/router';
import styles from './Layout.module.scss';
import classnames from 'classnames';

export interface LayoutProps {
  header: JSX.Element;
  children: JSX.Element;
}

const Layout = ({ header, children }: LayoutProps): JSX.Element => {
  const { pathname } = useRouter();
  const hasHeader = pathname !== '/' && pathname !== '/account/register';

  return (
    <div className={styles.layoutContainer}>
      {hasHeader && header}
      <main
        className={classnames(styles.layoutMain, {
          [styles.hasHeader]: hasHeader,
        })}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
