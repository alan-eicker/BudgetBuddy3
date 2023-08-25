import styles from './ContentSection.module.scss';

const ContentSection = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div className={styles.contentSection}>
    <div className={styles.contentSectionBody}>{children}</div>
  </div>
);

export default ContentSection;
