import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { COLOR_PALETTE } from './colors';

export interface SpendingSnapshotProps {
  title: string;
  height: number;
  colors?: string[];
  data: {
    name?: string;
    [key: string]: any;
  }[];
}

const SpendingSnapshot = ({
  title,
  height,
  colors,
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
          colors
            ? colors[i]
            : COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
        }
      />
    ));
  };

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>{title}</h2>
      <div style={{ width: '90%', margin: '0 auto' }}>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <XAxis stroke="#fff" dataKey="name" />
            <YAxis stroke="#fff" />
            <Legend verticalAlign="top" height={36} />
            {createLines()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingSnapshot;
