import { ReactNode } from 'react';

export interface JumbotronProps {
  children: ReactNode;
}

const Jumbotron = ({ children }: JumbotronProps): JSX.Element => {
  return <div className="jumbotron">{children}</div>;
};

export default Jumbotron;
