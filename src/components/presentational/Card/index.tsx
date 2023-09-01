import React from 'react';

interface CardProps {
  head: string | JSX.Element;
  children: React.ReactNode;
}

const Card = ({ head, children }: CardProps) => (
  <div className="card">
    <div className="card__head">{head}</div>
    <div className="card__body">{children}</div>
  </div>
);

export default Card;
