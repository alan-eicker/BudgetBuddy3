import Jumbotron from '@/components/Jumbtron';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';

const uData = [
  4000, 3000, 2000, 2780, 1890, 2390, 3490, 3000, 2000, 2780, 1890, 2390,
];
const pData = [
  2400, 1398, 9800, 3908, 4800, 3800, 4300, 1398, 9800, 3908, 4800, 3800,
];
const xLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const ExpenseGroupDetail = (): JSX.Element => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth - 40);

  useEffect(() => {
    window.onresize = () => {
      setChartWidth(window.innerWidth - 40);
    };
  }, []);

  return (
    <>
      <Jumbotron>
        <div>
          <h2 style={{ textAlign: 'center' }}>12 Month Spending Snapshot</h2>
          <LineChart
            width={chartWidth}
            height={300}
            series={[
              { data: pData, label: '2022' },
              { data: uData, label: '2023' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            colors={['#03B2AF', '#ff5794']}
          />
        </div>
      </Jumbotron>
      <p>Expense Group Detail</p>
    </>
  );
};

export default ExpenseGroupDetail;
