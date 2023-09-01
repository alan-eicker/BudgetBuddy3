import { ReactNode } from 'react';
import styles from './ContentSection.module.scss';

const ContentSection = ({
  children,
  maxWidth,
}: {
  children: ReactNode;
  maxWidth?: number | undefined;
}): JSX.Element => (
  <div className={styles.container}>
    <div className={styles.body} style={{ maxWidth }}>
      {children}
    </div>
  </div>
);

export default ContentSection;
