import { useEffect, useState } from 'react';
import Jumbotron from '@/components/presentational/Jumbtron';
import { LineChart, Line, XAxis, YAxis, Legend } from 'recharts';

const getWindowWidth = () => {
  return window.innerWidth - 60;
};

const data = [
  {
    name: 'Jan',
    2022: 4500,
    2023: 3500,
  },
  {
    name: 'Feb',
    2022: 5200,
    2023: 4300,
  },
  {
    name: 'Mar',
    2022: 3320,
    2023: 4700,
  },
  {
    name: 'Apr',
    2022: 4356,
    2023: 7034,
  },
  {
    name: 'May',
    2022: 5670,
    2023: 3290,
  },
  {
    name: 'Jun',
    2022: 4300,
    2023: 5230,
  },
  {
    name: 'Jul',
    2022: 2300,
    2023: 3345,
  },
  {
    name: 'Aug',
    2022: 8030,
    2023: 4356,
  },
  {
    name: 'Sep',
    2022: 5467,
    2023: 3456,
  },
  {
    name: 'Oct',
    2022: 7345,
    2023: 5233,
  },
  {
    name: 'Nov',
    2022: 6100,
    2023: 4355,
  },
  {
    name: 'Dec',
    2022: 3567,
    2023: 7100,
  },
];

const ExpenseGroupDetail = (): JSX.Element => {
  const [chartWidth, setChartWidth] = useState(500);

  useEffect(() => {
    setChartWidth(getWindowWidth());

    window.onresize = () => setChartWidth(getWindowWidth());
  }, []);

  return (
    <>
      <Jumbotron>
        {/* Extract this into Snapshot component */}
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
            12 Month Spending Snapshot
          </h2>
          <LineChart width={chartWidth} height={300} data={data}>
            <XAxis stroke="#fff" dataKey="name" />
            <YAxis stroke="#fff" />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="2022" stroke="#03B2AF" />
            <Line type="monotone" dataKey="2023" stroke="#ff5794" />
          </LineChart>
        </div>
      </Jumbotron>
      <p>Expense Group Detail</p>
    </>
  );
};

export default ExpenseGroupDetail;
