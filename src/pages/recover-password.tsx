import Head from 'next/head';
import ContentSection from '@/components/ContentSection';

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>BudgetBuddy | Recover Password</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BudgetBuddy recover password page" />
      </Head>
      <ContentSection>Reset password</ContentSection>
    </>
  );
}
