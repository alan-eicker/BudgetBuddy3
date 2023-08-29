import styles from './ContentSection.module.scss';

const ContentSection = ({
  children,
  maxWidth,
}: {
  children: React.ReactNode;
  maxWidth: number;
}): JSX.Element => (
  <div className={styles.contentSection}>
    <div className={styles.contentSectionBody} style={{ maxWidth }}>
      {children}
    </div>
  </div>
);

export default ContentSection;
