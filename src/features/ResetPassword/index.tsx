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
  const [step, setStep] = useState(1);
  const [securityQuestions, setSecurityQuestions] =
    useState<SecurityQuestion[]>();

  function Step2() {
    return (
      <>
        <Typography component="h1" variant="h4" marginBottom={4}>
          Please answer your security questions
        </Typography>
        <SecurityQuestionsForm
          onSuccess={() => {
            setStep(3);
          }}
          onError={(errorText) => setError(errorText)}
          questions={securityQuestions as SecurityQuestion[]}
        />
      </>
    );
  }

  function Step1() {
    return (
      <>
        <Typography component="h1" variant="h4" marginBottom={2}>
          Let&apos;s start by finding your email address
        </Typography>
        <Typography marginBottom={4}>
          In order to reset your password, we&apos;ll first need to find the
          email address associated with your account.
        </Typography>
        <SecurityQuestionSearchForm
          onSuccess={(questions) => {
            setSecurityQuestions(questions);
            setStep(2);
          }}
          onError={(errorText) => setError(errorText)}
        />
      </>
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
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
    </Box>
  );
}
