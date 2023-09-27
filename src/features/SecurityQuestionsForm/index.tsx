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
  const initialValues = Object.fromEntries(
    questions.map((question) => [question._id, '']),
  );
  const validationSchema = yup.object(
    Object.fromEntries(
      questions.map((question) => [
        question._id,
        yup.string().required('Required field'),
      ]),
    ),
  );

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (formData) => {
        console.log(formData);
      },
    });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2} marginBottom={2}>
        {questions.map(({ _id, question }) => {
          const name = _id as string;
          return (
            <Grid key={_id} item xs={12} sm={12} md={12}>
              <TextField
                name={name}
                label={question}
                autoComplete="off"
                fullWidth
                onChange={handleChange}
                value={values[name]}
                {...(!!(errors[name] && touched[name]) && {
                  error: true,
                  helperText: errors[name] as string,
                })}
              />
            </Grid>
          );
        })}
      </Grid>
      <LoadingButton
        type="submit"
        size="large"
        variant="contained"
        loading={isSubmitting}
      >
        Submit Answers
      </LoadingButton>
    </form>
  );
}
