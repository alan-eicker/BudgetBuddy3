import { ReactNode } from 'react';

const ContentSection = ({
  children,
  maxWidth,
}: {
  children: ReactNode;
  maxWidth?: number | undefined;
}): JSX.Element => (
  <div className="content-section">
    <div className="content-section__body" style={{ maxWidth }}>
      {children}
    </div>
  </div>
);

export default ContentSection;
