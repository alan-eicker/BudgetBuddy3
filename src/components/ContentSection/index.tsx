import { ReactNode } from 'react';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import styles from './ContentSection.module.scss';

const ContentSection = ({
  children,
  maxWidth,
  compressed,
  noPaddingTop,
  noPaddingBottom,
  noPadding,
}: {
  children: ReactNode;
  maxWidth?: number | undefined;
  compressed?: boolean;
  noPaddingTop?: boolean;
  noPaddingBottom?: boolean;
  noPadding?: boolean;
}): JSX.Element => (
  <Box
    className={classnames(styles.container, {
      [styles.isCompressed]: compressed,
      [styles.noPaddingTop]: noPaddingTop,
      [styles.noPaddingBottom]: noPaddingBottom,
      [styles.noPadding]: noPadding,
    })}
  >
    <Box className={styles.body} style={{ maxWidth }}>
      {children}
    </Box>
  </Box>
);

export default ContentSection;
