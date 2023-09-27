import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@/components/Alert';
import SecurityQuestionSearchForm from '@/features/SecurityQuestionSearchForm';
import SecurityQuestionsForm from '@/features/SecurityQuestionsForm';
import { SecurityQuestion } from '@/graphql/generated/graphql';
import { COLORS } from '@/constants';

export default function ResetPassword() {
  const [error, setError] = useState<string>();
  const [securityQuestions, setSecurityQuestions] =
    useState<SecurityQuestion[]>();

  if (securityQuestions) {
    return (
      <Box padding={4} bgcolor={COLORS.formBackground}>
        <Typography component="h1" variant="h4" marginBottom={4}>
          Please answer your security questions
        </Typography>
        <SecurityQuestionsForm questions={securityQuestions} />
      </Box>
    );
  }

  return (
    <Box padding={4} bgcolor={COLORS.formBackground}>
      {error && (
        <Box marginBottom={2}>
          <Alert variant="filled" color="error">
            {error}
          </Alert>
        </Box>
      )}
      <Typography component="h1" variant="h4" marginBottom={2}>
        Let&apos;s start by finding your email address
      </Typography>
      <Typography marginBottom={4}>
        In order to reset your password, we&apos;ll first need to find the email
        address associated with your account.
      </Typography>
      <SecurityQuestionSearchForm
        onSuccess={(questions) => setSecurityQuestions(questions)}
        onError={(errorText) => setError(errorText)}
      />
    </Box>
  );
}
