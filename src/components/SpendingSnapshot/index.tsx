import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '../Card';
import TrendingSnapshot from '../TrendingSnapshot';

interface SpendingSnapshotProps {
  title?: string;
  items: [string, any][];
}

const SpendingSnapshot = ({
  title = 'Spending Snapshot',
  items,
}: SpendingSnapshotProps): JSX.Element => (
  <Card
    head={
      <Typography component="h3" fontSize={20} textAlign="center">
        {title}
      </Typography>
    }
  >
    <TrendingSnapshot value={7} direction="down" />
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
