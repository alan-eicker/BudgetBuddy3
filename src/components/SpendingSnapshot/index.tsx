import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
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
