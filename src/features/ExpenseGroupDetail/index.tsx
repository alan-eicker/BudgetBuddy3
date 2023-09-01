import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ContentSection from '@/components/presentational/ContentSection';

const ExpenseGroupDetail = (): JSX.Element => {
  return (
    <div className="expense-detail">
      <div className="expense-detail__head">
        <ContentSection>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              className="expense-detail__head__left-content"
            >
              <Button href="/account/dashboard">
                &laquo; Back to dashboard
              </Button>
              <Typography component="h1" variant="h4">
                08/25/2023 - 09/08/2023
              </Typography>
              <Typography component="h2" variant="h6">
                Total Budget: $5,728.00
              </Typography>
            </Grid>
            <Grid
              alignItems="center"
              item
              xs={12}
              sm={6}
              md={6}
              className="expense-detail__head__right-content"
            >
              <Button variant="contained" size="small">
                Edit
              </Button>
              <Button variant="contained" size="small">
                Duplicate
              </Button>
              <Button color="error" variant="contained" size="small">
                Delete
              </Button>
            </Grid>
          </Grid>
        </ContentSection>
      </div>
      <div className="expense-detail__body">
        <ContentSection>
          <div style={{ height: 900 }}>content</div>
        </ContentSection>
      </div>
    </div>
  );
};

export default ExpenseGroupDetail;
