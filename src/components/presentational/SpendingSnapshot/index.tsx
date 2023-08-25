import {
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { COLOR_PALETTE } from './colors';
import styles from './SpendingSnapshot.module.scss';

export interface SpendingSnapshotProps {
  title: string;
  titleElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  height: number;
  linecolors?: string[];
  axisColor?: string;
  gridColor?: string;
  legendHeight?: number;
  data: {
    name?: string;
    [key: string]: any;
  }[];
}

const SpendingSnapshot = ({
  title,
  titleElement: TitleElement = 'div',
  height,
  linecolors,
  axisColor = '#000',
  gridColor = '#000',
  legendHeight = 36,
  data,
}: SpendingSnapshotProps) => {
  if (!data.length) {
    return null;
  }

  const createLines = () => {
    const [chartItem] = data;
    delete chartItem.name;

    return Object.keys(chartItem).map((key, i) => (
      <Line
        key={key}
        isAnimationActive={false}
        type="monotone"
        dataKey={key}
        stroke={
          linecolors
            ? linecolors[i]
            : COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
        }
      />
    ));
  };

  return (
    <div className={styles.spendingSnapshotContainer}>
      <TitleElement className={styles.spendingSnapshotTitle}>
        {title}
      </TitleElement>
      <div className={styles.spendingSnapshotContent}>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis stroke={axisColor} dataKey="name" />
            <YAxis stroke={axisColor} />
            <Tooltip />
            <Legend verticalAlign="top" height={legendHeight} />
            {createLines()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingSnapshot;
