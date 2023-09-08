import Box from '@mui/material/Box';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

interface TrendingSnapshotProps {
  value: number;
  direction: 'up' | 'down';
}

const colors = {
  up: '#f44336',
  down: '#8bc34a',
};

const TrendingSnapshot = ({
  value,
  direction,
}: TrendingSnapshotProps): JSX.Element => {
  const TrendingIcon =
    direction === 'up' ? ArrowUpwardRoundedIcon : ArrowDownwardRoundedIcon;
  const text = direction === 'up' ? 'higher' : 'lower';

  return (
    <Box textAlign="center" color={colors[direction]}>
      <TrendingIcon sx={{ fontSize: 50 }} />
      <Box marginTop={-1}>
        Trending {value}% {text} than last period
      </Box>
    </Box>
  );
};

export default TrendingSnapshot;
