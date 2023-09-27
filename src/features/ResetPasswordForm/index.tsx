import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@/components/Alert';
import EmailSearchForm from '../EmailSearchForm';
import SecurityQuestionsForm from '../SecurityQuestionsForm';
import { SecurityQuestion } from '@/graphql/generated/graphql';
import { getSecurityQuestions, queryClient } from '@/api';
import { COLORS } from '@/constants';

export default function ResetPasswordForm() {
  const [error, setError] = useState<string>();
  const [securityQuestions, setSecurityQuestions] =
    useState<SecurityQuestion[]>();

  async function getUserSecurityQuestions(email: string) {
    try {
      const response = await queryClient.fetchQuery(
        ['getSecurityQuestions'],
        () => getSecurityQuestions({ email }),
      );

      setSecurityQuestions(response.questions as SecurityQuestion[]);
    } catch (err) {
      setError(`Could not find user associated with [${email}].`);
    }
  }

  if (securityQuestions) {
    return (
      <Box padding={4} bgcolor={COLORS.formBackground}>
        <Typography component="h1" variant="h4" marginBottom={4}>
          Please answer the following security questions
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
      <EmailSearchForm
        isDone={!!(error || securityQuestions)}
        onSearch={getUserSecurityQuestions}
      />
    </Box>
  );
}
