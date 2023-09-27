import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmailSearchForm from '../EmailSearchForm';
import { getSecurityQuestions } from '@/api';

export default function ResetPasswordForm() {
  function getUserSecurityQuestions(email: string) {
    console.log(email);
  }

  return (
    <>
      <EmailSearchForm onSearch={getUserSecurityQuestions} />
    </>
  );
}
