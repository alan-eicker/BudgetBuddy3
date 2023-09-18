import classnames from 'classnames';
import styles from './PipeList.module.scss';

interface PipeListProps<T> {
  className?: string;
  items: T[];
}

const PipeList = <T,>({ items, className }: PipeListProps<T>) => (
  <ul className={classnames(styles.list, className)}>
    {items.map((item: T) => (
      <li key={Math.random()}>
        <>{item}</>
      </li>
    ))}
  </ul>
);

export default PipeList;
