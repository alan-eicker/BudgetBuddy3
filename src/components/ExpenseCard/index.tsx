import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Card from '@/components/Card';
import { Expense } from '@/graphql/generated/graphql';

interface ExpenseCardProps extends Expense {
  isOverdue: boolean;
}

const ExpenseCard = ({
  isOverdue = false,
  isPaid = false,
  name,
  balance = 0,
  dueDate,
  note,
}: ExpenseCardProps) => (
  <Card
    hasError={isOverdue}
    head={
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography component="h3" fontSize={20} marginRight={1.5}>
            {name}
          </Typography>
          {isOverdue && (
            <>
              <ErrorOutlineIcon color="error" />
              <Typography
                component="span"
                marginLeft={0.5}
                color="#f44336"
                fontSize={12}
              >
                Overdue
              </Typography>
            </>
          )}
        </Box>
        <Box>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </Box>
      </Box>
    }
  >
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Box>Balance: ${balance}</Box>
        <Box>Due Date: {dueDate}</Box>
      </Box>
      <Box>
        Paid
        <Switch checked={isPaid} />
      </Box>
    </Box>
    {note && (
      <Box display="flex" alignItems="center" marginTop={1}>
        <ErrorOutlineOutlinedIcon
          color="info"
          fontSize="small"
          sx={{ marginRight: 0.5 }}
        />
        <Typography component="span" fontSize={12}>
          {note}
        </Typography>
      </Box>
    )}
  </Card>
);

export default ExpenseCard;
