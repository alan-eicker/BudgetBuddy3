import { ReactElement } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Card from '@/components/Card';
import { Expense } from '@/graphql/generated/graphql';
import { formatNumber } from '@/utils/expenses';
import { COLORS } from '@/constants';

interface ExpenseCardProps extends Expense {
  isDarkTheme?: boolean;
  isOverdue?: boolean;
  actions?: ReactElement<HTMLButtonElement>[];
}

const ExpenseCard = ({
  isDarkTheme = false,
  isOverdue = false,
  isPaid = false,
  name,
  balance = 0,
  dueDate,
  note,
  actions,
}: ExpenseCardProps) => (
  <Card
    isDarkTheme={isDarkTheme}
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
                color={COLORS.error}
                fontSize={12}
              >
                Overdue
              </Typography>
            </>
          )}
        </Box>
        {actions && <Box>{actions}</Box>}
      </Box>
    }
  >
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Box>Balance: ${formatNumber(balance)}</Box>
        <Box>Due Date: {dueDate}</Box>
      </Box>
      <Box>
        Paid
        <Switch checked={isPaid} />
      </Box>
    </Box>
    {note && (
      <Box display="flex" alignItems="center" marginTop={1}>
        <InfoOutlinedIcon
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
