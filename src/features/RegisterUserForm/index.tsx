import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BrandLogo from '@/components/BrandLogo';

const RegisterUserForm = () => {
  return (
    <form>
      <Typography
        sx={{ marginBottom: 2, textAlign: 'center' }}
        variant="h5"
        component="div"
      >
        <BrandLogo size={60} />
        <h1>Create an Account</h1>
      </Typography>
      <TextField required label="Email" name="email" />
      <TextField required label="Username" name="username" />
      <TextField required label="Password" name="password" />
      <Button variant="contained" size="large">
        Create User
      </Button>
    </form>
  );
};

export default RegisterUserForm;
