import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

    const randomColors = () => {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    return Object.keys(chartItem).map((key, i) => (
      <Line
        key={key}
        isAnimationActive={false}
        type="monotone"
        dataKey={key}
        stroke={colors ? colors[i] : randomColors()}
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
