import {
  CartesianGrid,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import {
  ValueType,
  NameType,
  Payload,
} from 'recharts/types/component/DefaultTooltipContent';
import { COLOR_PALETTE } from './colors';
import styles from './LineChart.module.scss';

interface LineChartProps {
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

const LineChart = ({
  title,
  titleElement: TitleElement = 'div',
  height,
  linecolors,
  axisColor = '#000',
  gridColor = '#000',
  legendHeight = 40,
  data,
}: LineChartProps) => {
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
        strokeWidth={2}
        stroke={
          linecolors
            ? linecolors[i]
            : COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
        }
      />
    ));
  };

  const ChartTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.lineChartTooltip}>
          {payload.map(
            ({ name, value, color }: Payload<ValueType, NameType>) => (
              <div key={name}>
                <span style={{ color }}>{name}</span>: ${value}
              </div>
            ),
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.lineChartContainer}>
      <TitleElement className={styles.lineChartTitle}>{title}</TitleElement>
      <div className={styles.lineChartContent}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={data}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis stroke={axisColor} dataKey="name" />
            <YAxis stroke={axisColor} />
            <Tooltip content={<ChartTooltip />} />
            <Legend verticalAlign="top" height={legendHeight} />
            {createLines()}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
