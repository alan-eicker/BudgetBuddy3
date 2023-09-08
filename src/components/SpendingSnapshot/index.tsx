import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import Card from '../Card';

interface SpendingSnapshotProps {
  title?: string;
  items: [string, any][];
}

const SpendingSnapshot = ({
  title = 'Spending Snapshot',
  items,
}: SpendingSnapshotProps) => (
  <Card
    head={
      <Typography component="h3" fontSize={20} textAlign="center">
        {title}
      </Typography>
    }
  >
    <Box textAlign="center" color="#8bc34a">
      <ArrowDownwardRoundedIcon sx={{ fontSize: 50 }} />
      <Box marginTop={-1}>Trending 5% Lower than last period</Box>
    </Box>
    <Box marginTop={2.5} marginBottom={2.5}>
      <Divider />
    </Box>
    <List disablePadding dense>
      {items.map(([label, value]) => (
        <ListItem key={label} className="text-center" disablePadding>
          <ListItemText>
            <Typography component="h4">{label}</Typography>
            <Typography fontSize={26} fontWeight="bold">
              {value}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  </Card>
);

export default SpendingSnapshot;
