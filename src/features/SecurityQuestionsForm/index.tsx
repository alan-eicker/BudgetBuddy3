import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import { SecurityQuestion } from '@/graphql/generated/graphql';

interface SecurityQuestionsFormProps {
  questions: SecurityQuestion[];
}

export default function SecurityQuestionsForm({
  questions,
}: SecurityQuestionsFormProps) {
  const initialValues = {};

  const validationSchema = yup.object({});

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (formData) => {},
    });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} marginBottom={2}>
        {questions.map(({ _id, question }) => (
          <Grid key={_id} item xs={12} sm={12} md={12}>
            <TextField label={question} autoComplete="off" fullWidth />
          </Grid>
        ))}
        {/* <TextField
            autoComplete="off"
            name="email"
            label="Email Address"
            onChange={handleChange}
            value={values.email}
            fullWidth
            {...(!!(errors.email && touched.email) && {
              error: true,
              helperText: errors.email,
            })}
          /> */}
      </Grid>
      <LoadingButton size="large" variant="contained" loading={isSubmitting}>
        Submit Answers
      </LoadingButton>
    </form>
  );
}
