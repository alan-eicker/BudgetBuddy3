import Box from '@mui/material/Box';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

interface TrendingSnapshotProps {
  value: number;
  direction: 'up' | 'down';
}

const propValues = {
  up: {
    Icon: ArrowUpwardRoundedIcon,
    color: '#f44336',
    text: 'higher',
  },
  down: {
    Icon: ArrowDownwardRoundedIcon,
    color: '#8bc34a',
    text: 'lower',
  },
};

const TrendingSnapshot = ({
  value,
  direction,
}: TrendingSnapshotProps): JSX.Element => {
  const { Icon, color, text } = propValues[direction];

  return (
    <Box textAlign="center" color={color}>
      <Icon sx={{ fontSize: 50 }} />
      <Box marginTop={-1}>
        Trending {value}% {text} than last period
      </Box>
    </Box>
  );
};

export default TrendingSnapshot;
