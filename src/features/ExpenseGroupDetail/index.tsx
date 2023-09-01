import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ContentSection from '@/components/presentational/ContentSection';
import styles from './ExpenseGroupDetail.module.scss';

const ExpenseGroupDetail = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <ContentSection>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} className={styles.headLeft}>
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
              className={styles.headRight}
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
      <div className={styles.body}>
        <ContentSection>
          <div style={{ height: 900 }}>content</div>
        </ContentSection>
      </div>
    </div>
  );
};

export default ExpenseGroupDetail;
