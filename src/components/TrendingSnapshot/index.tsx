import Box from '@mui/material/Box';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface TrendingSnapshotProps {
  value: number;
  direction: 'up' | 'down';
  prevPeriod: string;
}

const propValues = {
  up: {
    Icon: TrendingUpIcon,
    color: '#f44336',
    text: 'higher',
  },
  down: {
    Icon: TrendingDownIcon,
    color: '#8bc34a',
    text: 'lower',
  },
};

const TrendingSnapshot = ({
  value,
  direction,
  prevPeriod,
}: TrendingSnapshotProps): JSX.Element => {
  const { Icon, color, text } = propValues[direction];

  return (
    <Box textAlign="center" color={color}>
      <Icon sx={{ fontSize: 50 }} />
      <Box marginTop={-1}>
        Trending {value}% {text} from
        <br /> {prevPeriod}
      </Box>
    </Box>
  );
};

export default TrendingSnapshot;
