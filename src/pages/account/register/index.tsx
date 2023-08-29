import RegisterUserForm from '@/features/RegisterUserForm';
import ContentSection from '@/components/presentational/ContentSection';

const Register = () => {
  return (
    <ContentSection maxWidth={600}>
      <RegisterUserForm />
    </ContentSection>
  );
};

export default Register;
